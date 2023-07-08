import { React, useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

function SearchUser() {
  const [searchResult, setsearchResult] = useState([]);
  const [userData, setUserData] = useState([]);
  const userType = useSelector(state => state.onboarding.userType);
  // console.log("The user is: " + userType);


  // Getting user data from firebase
  async function fetchUserDataFromFirebase(type) {
    const userDataRef = collection(db, "Users");
    let q;

    if (type !== "") {
      q = query(userDataRef, where("userType", "==", type));
    } else {
      q = query(userDataRef);
    }

    const querySnapshot = await getDocs(q);

    const userData = [];
    querySnapshot.forEach((doc) => {
      userData.push({ ...doc.data(), id: doc.id });
    });

    return userData;
  }

  useEffect(() => {
    async function fetchData() {
      const userData = await fetchUserDataFromFirebase(userType);
      setUserData(userData);
    }
    fetchData();
  }, []);


  const getFilterData = (data, input, key) => {
    return data.filter((item) => {
      return item[key].toLowerCase().includes(input);
    });
  };


  const inputHandler = (e) => {
    const input = e.target.value.toLowerCase();
    if (input === "") {
      setsearchResult([]);
    } else {
      const key = "name";
      const filteredData = getFilterData(userData, input, key);
      setsearchResult(filteredData);
    }
  };



  return (
    <div
      className="main"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <h1>React Search</h1>
      <div className="search">
        <input onChange={inputHandler} type="text" placeholder="Search" />
      </div>
      <div
        className="searchResult"
        style={{
          width: "30%",
          marginTop: 10,
          alignItems: "flex-start",
        }}
      >
        <ul>
          {searchResult.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchUser;