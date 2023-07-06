import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import EmojiPicker from "emoji-picker-react";
import {
  addMsgsInMentorDatabase,
  updateMsgsInMentorDatabase,
  uploadMedia,
  getClientMsgs,
  updateMsgsInClientDatabase,
  getUserFromDatabase,
  addMsgsInClientDatabase,
} from "../../firebase";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

const Chat = () => {
  const userData = useSelector((state) => state.user.userData);
  const [mentors, setMentors] = useState([]);
  const [mentorZero, setMentorZero] = useState("");
  const [clientMsgs, setClientMsgs] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);

  const [selectedMentor, setselectedMentor] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const msgEndRef = useRef();

  const [newMsg, setNewMsg] = useState([]);
  const clientEmail = userData.email;

  // console.log("Mentors - ", mentors);
  // console.log("Client Messages- ", clientMsgs);
  //console.log(userData, "user");

  const fetchMentors = async () => {
    setMentorsLoading(true);
    const results = [];
    for (let i = 0; i < userData.mentors.length; i++) {
      let res = await getUserFromDatabase(userData.mentors[i]);
      results.push(res);
    }
    setMentors(results);
    setMentorZero(results[0]);
    setMentorsLoading(false);
  };

  const fetchClientMsgs = async () => {
    let results = await getClientMsgs(clientEmail);

    if (results.messages?.length !== clientMsgs.messages?.length) {
      console.log(results !== clientMsgs);
      setClientMsgs(results);
    } else if (clientMsgs.length === 0) {
      setClientMsgs(results);
    }
  };

  useEffect(() => {
    fetchMentors();
    fetchClientMsgs();
  }, []);

  const sendMsg = async () => {
    // FOR SENDING FILE

    if (file) {
      console.log("FILE_SELECTED");
      console.log("FILE :", file);
      setIsLoading(true);

      let fileUrl = await uploadMedia(file, "Messages");
      var curClientData;

      if (selectedMentor.messages === null) {
        curClientData = {
          ...selectedMentor,
          messages: [
            {
              createdAt: new Date(),
              msg: fileUrl,
              sendBy: clientEmail,
              type: file.type,
            },
          ],
        };
      } else {
        curClientData = {
          ...selectedMentor,
          messages: [
            ...selectedMentor.messages,
            {
              createdAt: new Date(),
              msg: fileUrl,
              sendBy: clientEmail,
              type: file.type,
            },
          ],
        };
      }
      setselectedMentor(curClientData);
      setIsLoading(false);

      console.log(curClientData);
      var isExist;
      for (let i = 0; i < clientMsgs.length; i++) {
        if (clientMsgs[i].email == selectedMentor.email) {
          isExist = true;
          break;
        } else {
          isExist = false;
        }
      }
      if (isExist) {
        setClientMsgs(
          clientMsgs.map((data) => {
            if (data.email == selectedMentor.email) {
              return data, curClientData;
            } else {
              return data;
            }
          })
        );
        await updateMsgsInMentorDatabase(selectedMentor.email, clientEmail, {
          messages: curClientData.messages,
        });
        await updateMsgsInClientDatabase(clientEmail, selectedMentor.email, {
          messages: curClientData.messages,
        });
      } else {
        setClientMsgs([...clientMsgs, curClientData]);
        await addMsgsInMentorDatabase(selectedMentor.email, clientEmail, {
          messages: curClientData.messages,
        });
        await addMsgsInClientDatabase(clientEmail, selectedMentor.email, {
          messages: curClientData.messages,
        });
      }
      setFile(null);
    } else {
      if (newMsg) {
        var curClientData;

        if (selectedMentor.messages === null) {
          curClientData = {
            ...selectedMentor,
            messages: [
              {
                createdAt: new Date(),
                msg: newMsg,
                sendBy: clientEmail,
                type: "text",
              },
            ],
          };
        } else {
          curClientData = {
            ...selectedMentor,
            messages: [
              ...selectedMentor.messages,
              {
                createdAt: new Date(),
                msg: newMsg,
                sendBy: clientEmail,
                type: "text",
              },
            ],
          };
        }
        setselectedMentor(curClientData);
        var isExist;
        for (let i = 0; i < clientMsgs.length; i++) {
          if (clientMsgs[i].email == selectedMentor.email) {
            isExist = true;
            break;
          } else {
            isExist = false;
          }
        }
        if (isExist) {
          setClientMsgs(
            clientMsgs.map((data) => {
              if (data.email == selectedMentor.email) {
                return data, curClientData;
              } else {
                return data;
              }
            })
          );
          await updateMsgsInMentorDatabase(selectedMentor.email, clientEmail, {
            messages: curClientData.messages,
          });
          await updateMsgsInClientDatabase(clientEmail, selectedMentor.email, {
            messages: curClientData.messages,
          });
        } else {
          setClientMsgs([...clientMsgs, curClientData]);
          await addMsgsInMentorDatabase(selectedMentor.email, clientEmail, {
            messages: curClientData.messages,
          });
          await addMsgsInClientDatabase(clientEmail, selectedMentor.email, {
            messages: curClientData.messages,
          });
        }
        setNewMsg("");
      }
    }
  };

  const onEmojiClickHandler = (emojiObj) => {
    setNewMsg((prevInput) => prevInput + emojiObj.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [selectedMentor]);

  useEffect(() => {
    var isEmailExist = false;
    for (let i = 0; i < clientMsgs?.length; i++) {
      if (clientMsgs[i].email == mentorZero.email) {
        isEmailExist = true;
        break;
      } else {
        isEmailExist = false;
      }
    }

    if (isEmailExist) {
      const messages = [];
      clientMsgs.forEach((data) => {
        if (data.email == mentorZero.email) {
          messages.push(...data.messages);
        }
      });

      messages.sort((a, b) => {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        if (dateA > dateB) return 1;
        else if (dateA < dateB) return -1;
        return 0;
      });

      setselectedMentor({
        image: mentorZero.image,
        name: mentorZero.name,
        email: mentorZero.email,
        messages: messages,
      });
    } else {
      setselectedMentor({
        image: mentorZero.image,
        name: mentorZero.name,
        email: mentorZero.email,
        messages: null,
      });
    }
  }, [mentorZero]);
  console.log(mentors, "mentors");

  return (
    <>
      <div className={styles.chat}>
        <div className={styles["users-section"]}>
          <div className={styles["top-bar-users"]}>
            <img
              src={userData && userData.image}
              alt="profile"
              className={styles["mentor-profile"]}
            />
          </div>
          <div className={styles["user-profiles"]}>
            {mentorsLoading ? (
              <div className={styles.loader}></div>
            ) : (
              mentors?.map((mentor, index) => (
                <div
                  key={index}
                  onClick={() => {
                    var isEmailExist = false;
                    for (let i = 0; i < clientMsgs?.length; i++) {
                      if (clientMsgs[i].email == mentor.email) {
                        isEmailExist = true;
                        break;
                      } else {
                        isEmailExist = false;
                      }
                    }

                    if (isEmailExist) {
                      const messages = [];
                      clientMsgs.forEach((data) => {
                        if (data.email == mentor.email) {
                          messages.push(...data.messages);
                        }
                      });

                      messages.sort((a, b) => {
                        const dateA = a.createdAt;
                        const dateB = b.createdAt;
                        if (dateA > dateB) return 1;
                        else if (dateA < dateB) return -1;
                        return 0;
                      });

                      setselectedMentor({
                        image: mentor.image,
                        name: mentor.name,
                        email: mentor.email,
                        messages: messages,
                      });
                    } else {
                      setselectedMentor({
                        image: mentor.image,
                        name: mentor.name,
                        email: mentor.email,
                        messages: null,
                      });
                    }
                  }}
                >
                  {mentor.name}
                </div>
              ))
            )}
          </div>
        </div>
        <div className={styles["chat-section"]}>
          <div className={styles["top-bar"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {selectedMentor.length === 0 ? null : (
                <img
                  src={selectedMentor.image}
                  alt="profile"
                  className={styles.profile}
                />
              )}
              {selectedMentor ? <h3>{selectedMentor.name}</h3> : null}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="images/add.png" alt="add" className={styles.add} />
              <img
                src="images/options.png"
                alt="add"
                className={styles.options}
              />
            </div>
          </div>

          <div className={styles["chat-area"]} id="chat-area">
            {selectedMentor?.messages ? (
              selectedMentor.messages.map((curMsg) => {
                if (curMsg.type == "text") {
                  return (
                    <>
                      <h4
                        className={
                          curMsg.sendBy == clientEmail
                            ? styles["client-h4"]
                            : styles["mentor-h4"]
                        }
                      >
                        {curMsg?.msg}
                      </h4>
                    </>
                  );
                } else if (
                  curMsg.type == "image/jpeg" ||
                  curMsg.type == "image/png"
                ) {
                  return (
                    <>
                      <a
                        href={curMsg.msg}
                        target="_blank"
                        rel="noreferrer"
                        className={
                          curMsg.sendBy == clientEmail
                            ? styles["client-img"]
                            : styles["mentor-img"]
                        }
                      >
                        <img
                          src={curMsg.msg}
                          alt="img"
                          style={{
                            width: "150px",
                            border: "2px solid #b9ceef",
                            borderRadius: "10px",
                          }}
                        />
                      </a>
                    </>
                  );
                } else {
                  return (
                    <a
                      href={curMsg.msg}
                      target="_blank"
                      rel="noreferrer"
                      className={
                        curMsg.sendBy == clientEmail
                          ? styles["client-img"]
                          : styles["mentor-img"]
                      }
                    >
                      <img
                        src="/images/doc.png"
                        alt="doc"
                        style={{
                          width: "150px",
                          border: "2px solid transparent",
                          borderRadius: "10px",
                        }}
                      />
                    </a>
                  );
                }
              })
            ) : selectedMentor?.messages === null ? (
              <h3 style={{ color: "grey", textAlign: "center" }}>
                No Conversation yet!
              </h3>
            ) : null}

            <div ref={msgEndRef}></div>
            {isLoading ? (
              <h5
                style={{ position: "absolute", right: "2rem", bottom: "15%" }}
              >
                SENDING FILE...
              </h5>
            ) : null}
          </div>

          <div className={styles["bottom-bar"]}>
            <label htmlFor="file">
              <img
                src="images/attachment.png"
                alt="attachment"
                className={styles.attachment}
                style={
                  selectedMentor.length === 0 ? { cursor: "no-drop" } : null
                }
              />
            </label>
            <input
              onInput={(e) => {
                setFile(e.target.files[0]);
                toast.success('File selected, press "Enter ↩" to send');
              }}
              type="file"
              id="file"
              style={{ display: "none" }}
              disabled={selectedMentor.length === 0 ? true : false}
            />
            <img
              src="images/emoji.png"
              alt="emoji"
              className={styles.emoji}
              onClick={() => {
                if (selectedMentor.length === 0) {
                  return;
                }
                setShowEmojiPicker(!showEmojiPicker);
              }}
              style={selectedMentor.length === 0 ? { cursor: "no-drop" } : null}
            />
            <input
              value={newMsg}
              type="text"
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  if (file === null) {
                    if (!newMsg.replace(/\s/g, "").length) {
                      toast.error("Enter atleast one character");
                      return;
                    }
                  }
                  sendMsg();
                }
              }}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Message"
              className={styles["message-input"]}
              disabled={selectedMentor.length === 0 ? true : false}
              style={selectedMentor.length === 0 ? { cursor: "no-drop" } : null}
            />
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <div className={styles["emoji-picker"]}>
          <EmojiPicker onEmojiClick={onEmojiClickHandler} width={300} />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Chat;
