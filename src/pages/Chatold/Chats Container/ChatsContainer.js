
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatSkeleton from '../../../components/Post Skeleton/Chat Skeleton/ChatSkeleton'
import { db, getAllUserHavingChatWith } from '../../../firebase'
import styles from "./ChatContainer.module.css"
import { updateSelectedUser } from '../../../features/chatSlice_latest'


// const currentcUser={email:"jatin@reverrapp.com"}

const ChatsContainer = ({sorter}) => {
  const currentcUser = useSelector((state) => state.userDoc);
  // const currentcUser={email:"mauricerana@gmail.com"}
  const dispatch=useDispatch()
  const[dummyLoading,setDummyLoadig]=useState(false)
  const[dummyLoading2,setDummyLoadig2]=useState(false)
  const [chatList,setChatList]=useState([])
  const chatData=useSelector((state)=>state.chatLatest)
  const[chatUserData,setChatUserData]=useState([])
  // const[dummyAr,setDummyAr]=useState([])

  const getAllUserChat=async()=>{
    setDummyLoadig(true)
    await getAllUserHavingChatWith(currentcUser,setChatList)
    setDummyLoadig(false)

  }
useEffect(()=>{
  
   getAllUserChat()
   
    },[])




useEffect(()=>{
 
  if(chatList.length===0){setDummyLoadig2(false);return}
  // if(window.location.pathname==="/dashboard"){
  //     chatList.map(async(list,idx)=>{
  //       const docRef = doc(db, "Users", list.id);
  //     const docSnap = await getDoc(docRef);
  //     setDummyAr((p)=>{
  //       return [...p,{id:docSnap.data().email,name:docSnap.data().name,userImg:docSnap.data().image,latestMessage:list?.messages[list?.messages?.length-1].msg,sendAT:list.messages[list.messages.length-1].createdAt!==""?list?.messages[list?.messages?.length-1].createdAt.seconds*1000:""}]
  //     })
  //     setDummyLoadig2(false)
  //     })   
  //   return
  // }
  if(chatUserData.length===0){
  chatList.map(async(list,idx)=>{
    const docRef = doc(db, "Users", list.id);
  const docSnap = await getDoc(docRef);
  setChatUserData((prev)=>{
    return [...new Set([...prev,{id:docSnap.data().email,email:docSnap.data().email,userType:docSnap.data().userType,bucket:list?.bucket,name:docSnap.data().name,userImg:docSnap.data().image,latestMessage:list?.messages[list?.messages?.length-1].msg,sendAT:list.messages[list.messages.length-1].createdAt!==""?list?.messages[list?.messages?.length-1].createdAt.seconds*1000:"",latestMessageSenderId:list?.messages[list?.messages?.length-1].sendBy,imgMsg:list?.messages[list?.messages?.length-1].image}])]
  })
  setDummyLoadig2(false)
  })
  }
else if(chatUserData.length>0){

  let newChatUserData=[]
  chatUserData.forEach((oldChat)=>{
    chatList.forEach((newList)=>{
      if((oldChat?.id===newList?.id)){newChatUserData.push ({...oldChat,latestMessage:newList?.messages[newList?.messages?.length-1].msg,sendAT:newList.messages[newList.messages.length-1].createdAt!==""?newList?.messages[newList?.messages?.length-1].createdAt.seconds*1000:"",imgMsg:newList?.messages[newList?.messages?.length-1].image})}
      else {return}
    })
  })
 
  let dummy=newChatUserData
  dummy.sort(customSort)
  const finaluserChatArr=chatUserData.map((oldChat)=>{
    if(oldChat?.id===dummy[0]?.id){return{...oldChat,latestMessage:dummy[0]?.latestMessage,sendAT:dummy[0].sendAT,imgMsg:dummy[0]?.imgMsg}}
    else{return oldChat}
  })
  setChatUserData(finaluserChatArr)
 
}
// eslint-disable-next-line
},[chatList])


// useEffect(()=>{
//   if(window.location.pathname==="/dashboard"){
//     const tempId=[]
//     // eslint-disable-next-line
//     dummyAr.map((d)=>{if(tempId.includes(d.id)){return}
// setChatUserData((prev)=>{return[...prev,{...d}]})
// tempId.push(d.id)
//     })
//   }
// },[dummyAr])

function customSort(a,b){
  const dateA=new Date(a.sendAT)
  const dateB=new Date(b.sendAT)
  
  if(dateB>dateA){return 1}
  else if(dateB<dateA){return-1}
  return 0

}

useEffect(()=>{

},[sorter])

  return (
    <section className={styles.outerCont}>
      {dummyLoading2 && <ChatSkeleton cards={3} />}
      {dummyLoading && <ChatSkeleton cards={3} />}
      {!dummyLoading && chatUserData.length === 0 && (
        <>
          <p className={styles.noChatsMesssage}>No Chats To Display</p>
        </>
      )}

      {chatUserData.length > 0 &&
        chatUserData
          .sort((a, b) => {
            return (sorter==="Newest"?(b.sendAT - a.sendAT):(a.sendAT - b.sendAT));
          })
          .map((data, idx) => {
            return (
              <>
                <div key={idx} onClick={() => {dispatch(updateSelectedUser(data));
                  }}
                  style={{
                    background:
                      chatData?.selectedUser?.id === data.id ? "#EEEEEE" : "",
                  }}
                  className={styles.chatCont}
                >
                  <img
                    className={styles.chatImg}
                    src={data.userImg}
                    alt="chatImg"
                  />

                  <div className={styles.userCont}>
                    <h3 className={styles.userName}>{data.name}</h3>
                    <div className={styles.userLastTextCont}>
                      <p className={styles.userLastText}>
                        {data.latestMessageSenderId === currentcUser.email &&
                          "Me: "}
                      </p>{" "}
                      <p className={styles.userLastText}>
                        {data.latestMessage !== ""
                          ? data.latestMessage
                          : "Image"}
                      </p>
                    </div>
                  </div>
                  <p className={styles.chatTime}>
                    {data.sendAT !== ""
                      ? new Date(data.sendAT).toTimeString().slice(0, 5)
                      : ""}
                  </p>
                </div>
              </>
            );
          })}
    </section>
  );
};

export default ChatsContainer;
