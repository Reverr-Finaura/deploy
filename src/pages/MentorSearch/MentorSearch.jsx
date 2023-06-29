import React, { useEffect, useState } from "react";
import styles from "./mentorSearch.module.css";
import Arrow from "../../images/evaArrowIosDownwardFill2.svg";
import ProfileCardTesting from "../Mentors/ProfileCardTesting";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const MentorSearch = () => {
  const navigate = useNavigate();
  const { industry } = useParams();
  const [mentorArray, setMentorArray] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

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
      const data = {
        name: item.name,
        email: item.email,
        about: item.about,
        industry: item.industry?.split(",").map((x) => x.trim()),
        domain: item.domain,
        designation: item.designation,
        linkedin: item.linkedin,
        image: item.image,
        plans: item.plans,
      };
      setSearchResult((prev) => {
        if (data.industry.includes(industry)) {
          return [...prev, data];
        } else {
          return [...prev];
        }
      });
    });
    // setArrayToBeMapped(mentorArray);
  }, [mentorArray, industry]);

  return (
    <>
      <div className={styles.searchPageWrapper}>
        <div className={styles.title}>
          <p>
            <img
              src={Arrow}
              alt="NavigateArrow"
              onClick={() => {
                navigate("/mentors");
              }}
            />
            {industry.charAt(0).toUpperCase() + industry.slice(1)}
          </p>
        </div>
        <div className={styles.searchResultContainer}>
          {searchResult?.map((item,idx) => {
            return <ProfileCardTesting key={idx} mentor={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MentorSearch;
