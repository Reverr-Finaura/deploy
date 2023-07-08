import React, { useState, useEffect } from "react";
import EventCard from '../../components/EventCard/EventCard'
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const DiscoverEvents = () => {





  const [users, setUsers] = useState([]);
  const [randomArticles, setrandomArticles] = useState([]);
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

        setrandomArticles(randomArticlesArr);
      };

      getrandomArticles();
    }
  }, [users]);













  return (
    <section className='events-section'> 


    {/* Events */}
    <div className='events'>
            <h3 style={{color:'white', display:'flex', marginLeft:'20px'}}> Suggested <span style={{color:'blue'}}> Events </span> </h3>
            <button type="button" className="explore-btn" style={{float:'right', display:'flex', marginLeft:'1000px', }}>Explore Events</button>
    </div>  

            <button type="button" className="event-btn"style={{marginLeft:'20px'}}>Upcoming</button>  
            <button type="button" className="event-btn" >Ongoing</button>  

            <div className='event-card'>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
            </section>
  )
}

export default DiscoverEvents










// import React from 'react';
// import EventCard from '../../components/EventCard/EventCard';

// const DiscoverEvents = () => {
//   return (
//     <section className='events-section'>
//       {/* Events */}
//       <div className='events'>
//         <h3 style={{ color: 'white', display: 'flex' }}>
//           Suggested <span style={{ color: 'blue' }}>Events</span>
//         </h3>
//         <button style={{display:'flex', float:'right'}} type="button" className="explore-btn">Explore Events</button>
//       </div>

//       <button type="button" className="event-btn">Upcoming</button>
//       <button type="button" className="event-btn">Ongoing</button>

//       <div className='event-card'>
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//       </div>
//     </section>
//   );
// };

// export default DiscoverEvents;







// import React from 'react';
// import EventCard from '../../components/EventCard/EventCard';

// const DiscoverEvents = () => {
//   return (
//     <section className='events-section'>
//       {/* Events */}
//       <div className='events'>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h3 style={{ color: 'white' }}>
//             Suggested <span style={{ color: 'blue' }}>Events</span>
//           </h3>
//           <button type="button" className="explore-btn">Explore Events</button>
//         </div>
//       </div>

//       <button type="button" className="event-btn">Upcoming</button>
//       <button type="button" className="event-btn">Ongoing</button>

//       <div className='event-card'>
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//       </div>
//     </section>
//   );
// };

// export default DiscoverEvents;










// import React from 'react';
// import EventCard from '../../components/EventCard/EventCard';

// const DiscoverEvents = () => {
//   return (
//     <section className='events-section'>
//       {/* Events */}
//       <div className='events'>
//         <h3 style={{ color: 'white' }}>
//           Suggested <span style={{ color: 'blue' }}>Events</span>
//         </h3>
//         <button style={{ float: 'right' }} type="button" className="explore-btn">Explore Events</button>
//       </div>

//       <button type="button" className="event-btn">Upcoming</button>
//       <button type="button" className="event-btn">Ongoing</button>

//       <div className='event-card'>
//         <EventCard />
//         <EventCard />
//         <EventCard />
//         <EventCard />
//       </div>
//     </section>
//   );
// };

// export default DiscoverEvents;
