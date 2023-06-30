import React, { useEffect, useState } from "react";
import styles from "./TestingMentor.module.css";
import ProfileCardTesting from "./ProfileCardTesting";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import industry from "./Industry.json";
import categories from "./category.json";
import IndustryCard from "../../components/IndustryCard/IndustryCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SearchIcon from "../../images/Search.svg";

const MentorTesting = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 1000, min: 800 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [industryArray, setIndustryArray] = useState([]);
  const [mentorArray, setMentorArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [featuredMentors, setFeaturedMentors] = useState([]);

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
  useEffect(() => {
    const getRandomObjects = (arr, count) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomMentors = getRandomObjects(mentorArray, 5);
    const updatedMentors = randomMentors.map((item) => ({
      name: item.name,
      email: item.email,
      about: item.about,
      industry: item.industry?.split(",").map((x) => x.trim()),
      domain: item.domain,
      designation: item.designation,
      linkedin: item.linkedin,
      image: item.image,
      plans: item.plans,
    }));

    setFeaturedMentors(updatedMentors);
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
        {/* --------------------Header---------------------- */}
        <div className={styles.header}>
          <div>
            Find the best <span>Mentors</span>
          </div>
          <div className={styles.search}>
            <input type="text" placeholder="Search a mentor..." />
            <button
              type="button"
              style={{
                position: "absolute",
                top: "50%",
                right: "0.5rem",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={SearchIcon} alt="SearchIcon" />
            </button>
          </div>
        </div>
        {/* -----------------------Header End------------------------------- */}

        {/* ----------------------Carousel------------------------------ */}

        <div className={styles.sliderContainer}>
          <p>Featured Mentors</p>
          <div className={styles.slider}>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              // showDots={true}
              partialVisible={false}
              transitionDuration={500}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
            >
              {featuredMentors.map((item, idx) => {
                return <ProfileCardTesting key={idx} mentor={item} />;
              })}
            </Carousel>
          </div>
        </div>
        {/* ---------------Carousel End-------------------------------------- */}

        {/* ---------------Category Content------------------ */}
        <div className={styles.categoryWrapper}>
          <p>
            Browse by <span>Categories</span>
          </p>
          <div className={styles.categoryContainer}>
            {categories?.map((item, idx) => {
              return <IndustryCard key={idx} item={item} />;
            })}
          </div>
        </div>
        {/* ---------------Category Content End------------------ */}
      </div>
    </div>
  );
};

export default MentorTesting;
