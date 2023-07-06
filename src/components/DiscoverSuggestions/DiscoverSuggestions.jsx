// import React, { useState, useEffect } from "react";
// import ProfileCard from '../../components/ProfileCard/ProfileCard'
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";


// const DiscoverSuggestions = () => {

//   const [users, setUsers] = useState([]);

//   //FETCH USER DATA FROM FIREBASE
//   useEffect(() => {
//     async function fetchUsers() {
//       const mentorsRef = collection(db, "Users");
//       const q = query(mentorsRef);
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         if (
//           doc.data().hasOwnProperty("name") &&
//           doc.data().name !== "" &&
//           doc.data().hasOwnProperty("image") &&
//           doc.data().image !== ""
//         ) {
//           setUsers((prev) => {
//             return [...prev, doc.data()];
//           });
//         }
//       });
//     }
//     fetchUsers();
//   }, []);

//   let randomUsers = [];
//   let length = users.length - 1;

//   for (let i = 0; i < 4; i++) {
//     let randomIndex = Math.floor(Math.random() * length);
//     let randomElement = users[randomIndex];
//     randomUsers.push(randomElement);
//   }

// console.log(randomUsers)

//   return (
//     <section className='suggest-section'> 


//     {/* Suggestions */}
//     <div className='people-suggest'>
//             <h3 style={{color:'white', marginTop:'10px', marginLeft:'12px'}}> More <span style={{color:'blue'}}>Suggestions </span> </h3>
//         </div>
//         <div className='people-card'>
//           {randomUsers.map( (user) => {
//             return(
//               <div>
//                 <ProfileCard name={user.name} post={user.designation} imgUrl={user.image}/>
//               </div>
//             )
//           })
          
//           }

//         </div>

//             </section>
//   )
// }

// export default DiscoverSuggestions










// import React, { useState, useEffect } from "react";
// import ProfileCard from '../../components/ProfileCard/ProfileCard'
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "../../firebase";

// const DiscoverSuggestions = () => {
//   const [users, setUsers] = useState([]);
//   const [randomUsers, setRandomUsers] = useState([]);

//   // FETCH USER DATA FROM FIREBASE
//   useEffect(() => {
//     async function fetchUsers() {
//       const mentorsRef = collection(db, "Users");
//       const q = query(mentorsRef);
//       const querySnapshot = await getDocs(q);
//       const filteredUsers = querySnapshot.docs
//         .map(doc => doc.data())
//         .filter(docData =>
//           docData.hasOwnProperty("name") &&
//           docData.name !== "" &&
//           docData.hasOwnProperty("image") &&
//           docData.image !== ""
//         );
//       setUsers(filteredUsers);
//     }
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (users.length > 0) {
//       const getRandomUsers = () => {
//         let randomUsersArr = [];
//         let length = users.length - 1;

//         for (let i = 0; i < 4; i++) {
//           let randomIndex = Math.floor(Math.random() * length);
//           let randomElement = users[randomIndex];
//           randomUsersArr.push(randomElement);
//         }

//         setRandomUsers(randomUsersArr);
//       };

//       getRandomUsers();
//     }
//   }, [users]);

//   return (
//     <section className='suggest-section'>
//       {/* Suggestions */}
//       <div className='people-suggest'>
//         <h3 style={{ color: 'white', marginTop: '10px', marginLeft: '12px' }}> More <span style={{ color: 'blue' }}>Suggestions</span> </h3>
//       </div>
//       <div className='people-card'>
//         {randomUsers.length === 4 && randomUsers.map(user => (
//           <div key={user.id}>
//             <ProfileCard name={user.name} post={user.designation} imgUrl={user.image} />
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default DiscoverSuggestions;















import React, { useState, useEffect } from "react";
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const DiscoverSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);

  // FETCH USER DATA FROM FIREBASE
  useEffect(() => {
    async function fetchUsers() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      const filteredUsers = querySnapshot.docs
        .map(doc => doc.data())
        .filter(docData =>
          docData.hasOwnProperty("name") &&
          docData.name.trim() !== "" &&
          docData.hasOwnProperty("image") &&
          docData.image.trim() !== "" &&
          docData.hasOwnProperty("designation") &&
          docData.designation.trim() !== ""
        );
      setUsers(filteredUsers);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const getRandomUsers = () => {
        let randomUsersArr = [];
        let length = users.length - 1;

        for (let i = 0; i < 4; i++) {
          let randomIndex = Math.floor(Math.random() * length);
          let randomElement = users[randomIndex];
          randomUsersArr.push(randomElement);
        }

        setRandomUsers(randomUsersArr);
      };

      getRandomUsers();
    }
  }, [users]);


  return (
    <section className='suggest-section'>
      {/* Suggestions */}
      <div className='people-suggest'>
        <h3 style={{ color: 'white', marginTop: '10px', marginLeft: '20px' }}> More <span style={{ color: 'blue' }}>Suggestions</span> </h3>
      </div>
      <div className='people-card'>
        {randomUsers.length === 4 && randomUsers.map(user => (
          <div key={user.id}>
            <ProfileCard name={user.name} post={user.designation} imgUrl={user.image} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default DiscoverSuggestions;
