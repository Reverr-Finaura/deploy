// import React, {useState} from 'react'
// import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode'
// import './Discover.css'
// // import ProfileCard from '../../components/ProfileCard/ProfileCard'
// import ArticlesLeftSideBar from '../../components/ArticlesLeftSideBar/ArticlesLeftSideBar'
// import  DiscoverPeople  from '../../components/DiscoverPeople/DiscoverPeople'
// import DiscoverEvents from '../../components/DiscoverEvents/DiscoverEvents'
// import DiscoverSuggestions from '../../components/DiscoverSuggestions/DiscoverSuggestions'
// import DiscoverNews from '../../components/DiscoverNews/DiscoverNews'
// import ArticleRightSideBar from '../../components/ArticleRightSideBar/ArticleRightSideBar'


// const Discover = () => {

//   const [newsData, setNewsData] = useState([]);

//   return (
//     <>
//     <div className='container-1'>
        
//         <NavBarFinalDarkMode/>
//         <DiscoverPeople/>
//         <DiscoverEvents/>
//         <DiscoverSuggestions/>




// {/* Articles */}
//         <div className='article'>
//             <h3 style={{color:'white', marginTop:'10px', marginLeft:'20px'}}> <span style={{color:'blue'}}>Articles </span> for you</h3>
//         </div>

//         <div className='article-container'>
//         <ArticlesLeftSideBar/>
//             <div className='right-container'>

//                 {/* <NavLink exact to="/discover/featured"> */}
//                 <ArticleRightSideBar title='featured'/>
//                 {/* </NavLink> */}
//             </div>

//         </div>


//         {<DiscoverNews />}


//     </div>
    
//     </>
//   )
// }

// export default Discover














import React, { useState, useEffect } from 'react';
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode';
import './Discover.css';
import ArticlesLeftSideBar from '../../components/ArticlesLeftSideBar/ArticlesLeftSideBar';
import DiscoverPeople from '../../components/DiscoverPeople/DiscoverPeople';
import DiscoverEvents from '../../components/DiscoverEvents/DiscoverEvents';
import DiscoverSuggestions from '../../components/DiscoverSuggestions/DiscoverSuggestions';
import DiscoverNews from '../../components/DiscoverNews/DiscoverNews';
import ArticleRightSideBar from '../../components/ArticleRightSideBar/ArticleRightSideBar';
import axios from "axios";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const Discover = () => {

  // News
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://api.bing.microsoft.com/v7.0/news/search',
        params: { q: 'startup', safeSearch: 'Off', textFormat: 'Raw' },
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'd7e17be6d66f494ea9c6cddf39825060',
        },
      };

      const response = await axios.request(options);
      setNewsData(response.data.value);
    } catch (error) {
      console.log(error);
    }
  };







  // Events
  const [users, setUsers] = useState([]);
  const [randomEvents, setrandomEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const mentorsRef = collection(db, "Events");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      const filteredUsers = querySnapshot.docs
        // .filter(docData =>
        //   docData.hasOwnProperty("author") &&
        //   docData.author.trim() !== "" &&
        //   docData.hasOwnProperty("heading") &&
        //   docData.heading.trim() !== "" &&
        //   docData.hasOwnProperty("imageUrl") &&
        //   docData.imageUrl.trim() !== ""
        // )
        .map(doc => doc.data());
      setUsers(filteredUsers);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const getrandomArticles = () => {
        let randomArticlesArr = [];
        let length = users.length - 1;

        for (let i = 0; i < 4; i++) {
          let randomIndex = Math.floor(Math.random() * length);
          let randomElement = users[randomIndex];
          randomArticlesArr.push(randomElement);
        }

        setrandomEvents(randomArticlesArr);
      };

      getrandomArticles();
    }
  }, [users]);



console.log(randomEvents)


  return (
    <>
      <div className='container-1'>
        <NavBarFinalDarkMode />
        <DiscoverPeople />
        { randomEvents.length>0 && <DiscoverEvents />}
        <DiscoverSuggestions />

        {/* Articles */}
        <div className='article'>
          <h3 style={{ color: 'white', marginTop: '10px', marginLeft: '20px' }}>
            <span style={{ color: 'blue' }}>Articles</span> for you
          </h3>
        </div>

        <div className='article-container'>
          <ArticlesLeftSideBar />
          <div className='right-container'>
            {/* <NavLink exact to="/discover/featured"> */}
            <ArticleRightSideBar title='featured' />
            {/* </NavLink> */}
          </div>
        </div>

        {/* Conditionally render DiscoverNews */}
        {newsData.length >= 4 && <DiscoverNews />}
      </div>
    </>
  );
};

export default Discover;
