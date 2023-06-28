import React, { useEffect, useState } from "react";
import styles from "./TestingMentor.module.css";
import ProfileCardTesting from "./ProfileCardTesting";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import industry from "./Industry.json";
import IndustryCard from "../../components/IndustryCard/IndustryCard";


const MentorTesting = () => {
  const [industryArray, setIndustryArray] = useState([]);
  const [mentorArray, setMentorArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    async function fetchMentorExpertise() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (
          doc.data().userType === "Mentor" &&
          doc.data().domain &&
          // doc.data().industry !== ""&&
          doc.data().mentorUniqueID
        ) {
          setMentorArray((prev) => {
            return [...prev, doc.data()];
          });

          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
    }
    fetchMentorExpertise();
  }, []);

  useEffect(() => {
    mentorArray.map((item) => {
      setIndustryArray((prev) => {
        return [...prev, ...item?.industry?.split(",").map((x) => x.trim())];
      });
    });
    // setArrayToBeMapped(mentorArray);
  }, [mentorArray]);

  function removeEmptyIndustryFromArray() {
    let filteredData = [];
    filteredData = industryArray.filter((item) => item.trim() !== "");
    setFilteredArray(filteredData);
  }
  useEffect(() => {
    removeEmptyIndustryFromArray();
  }, [industryArray]);



  return (
    <div className={styles.mentor}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            Find the best <span>Mentors</span>
          </div>
          <div>
            <input type="text" placeholder="Search a mentor..." />
          </div>
        </div>

        <div className={styles.sliderContainer}>
          <p>Featured Mentors</p>
          <div className={styles.slider}>
            <ProfileCardTesting />
          </div>
        </div>

        {/* ---------------Category Content------------------ */}
        <div className={styles.categoryWrapper}>
          <p>
            Browse by <span>Categories</span>
          </p>
          <div className={styles.categoryContainer}>
            {industry?.map((item, idx) => {
              return <IndustryCard key={idx} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorTesting;
