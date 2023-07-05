// import React, { useState, useEffect } from "react";
// import './ArticleRightSideBar.css'
// import ArticleDisplay from './ArticleDisplay'
// import { collection, doc, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";


// const ArticleRightSideBar = (props) => {

//   const [users, setUsers] = useState([]);
//   const [randomArticles, setrandomArticles] = useState([]);

//   // FETCH USER DATA FROM FIREBASE
//   useEffect(() => {
//     async function fetchUsers() {
//       const mentorsRef = collection(db, "Blogs");
//       const q = query(mentorsRef);
//       const querySnapshot = await getDocs(q);
//       const filteredUsers = querySnapshot.docs
//         .map(doc => doc.data())
//         .filter(docData =>
//           docData.hasOwnProperty("author") &&
//           docData.author.trim() !== "" &&
//           docData.hasOwnProperty("heading") &&
//           docData.heading.trim() !== "" &&
//           docData.hasOwnProperty("imageUrl") &&
//           docData.imageUrl.trim() !== ""
//         );
//       setUsers(filteredUsers);
//     }
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (users.length > 0) {
//       const getrandomArticles = () => {
//         let randomArticlesArr = [];
//         let length = users.length - 1;

//         for (let i = 0; i < 4; i++) {
//           let randomIndex = Math.floor(Math.random() * length);
//           let randomElement = users[randomIndex];
//           randomArticlesArr.push(randomElement);
//         }

//         setrandomArticles(randomArticlesArr);
//       };

//       getrandomArticles();
//     }
//   }, [users]);



// console.log(randomArticles);

//   return (
//     <div>

//       { randomArticles && randomArticles.slice(0, 4).map( (news) => {
//           return(
//             <div className='allCards' style={{display:'flex', flexDirection:'row'}}>
//               <ArticleDisplay title={news.heading}/>
//             </div>

//             )
          
//           }
//         )
//       }

//     </div>
//     // <ArticleDisplay title={props.title}/>

  
    


//   )

// }

// export default ArticleRightSideBar
















import React, { useState, useEffect } from "react";
import './ArticleRightSideBar.css'
import ArticleDisplay from './ArticleDisplay'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";


const ArticleRightSideBar = (props) => {
  const [users, setUsers] = useState([]);
  const [randomArticles, setrandomArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const mentorsRef = collection(db, "Blogs");
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

        setrandomArticles(randomArticlesArr);
      };

      getrandomArticles();
    }
  }, [users]);


console.log(randomArticles);    

  return (
    <div className='right-container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        randomArticles && randomArticles.slice(0, 3).map((article) => (
          <div className='allCards' style={{ display: 'flex', flexDirection: 'row' }}>
            <ArticleDisplay title={article.heading} imgUrl={article.image.imageUrl} description={article.body} />
          </div>
        ))
      )}
    </div>
  );
}

export default ArticleRightSideBar;
