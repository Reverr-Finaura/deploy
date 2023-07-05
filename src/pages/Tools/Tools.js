// import { collection, getDocs, query } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react'
// import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar';
// import NavBarFinal from '../../components/Navbar/NavBarFinal';
// import SidebarFinal from '../../components/Sidebar Final/SidebarFinal';
// import { db } from '../../firebase';
// import styles from "./Tools.module.css"
// import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
// import PitchDeck from './PitchDeck/PitchDeck';
// import BusinessPlan from './Business Plan/BusinessPlan';
// import ToolsSkeleton from '../../components/Post Skeleton/Tools Skeleton/ToolsSkeleton';


// const list=["Pitch Deck","Business Plan","Business validation","Financial Models","fundraising","HR","Legal","startup basics"]

// const Tools = () => {
//     const [width, setWidth] = useState(window.innerWidth);
//     console.log("width",width)
//     const [pptList, setPptList] = useState([]);
//     const[docList,setDocList] = useState([]);
//     const[pptToShow,setPptToShow]=useState([]);
//     const [tagList, setTagList] = useState([]);
//     const[docTagList,setDocTagList]= useState([]);
//     const[docTagToShow,setDocTagToShow]=useState([])
//     const [dataFilter, setDataFilter] = useState("All");
//     console.log("pptList",pptList)
//     console.log("docList",docList)
//     console.log("docTagList",docTagList)
//   //UPDATE WIDTH
//   const updateWidth = () => {
//     setWidth(window.innerWidth);
//   };
//   useEffect(() => {
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, []); 
//   //FETCH PPT TEMPLATES FROM FIREBASE
//   useEffect(() => {
//     async function fetchPptListFromFirebase() {
//       const userDataRef = collection(db, "PptTemplates");
//       const q = query(userDataRef);
//       const querySnapshot = await getDocs(q);

//       querySnapshot.forEach((doc) => {
//         setTagList((prev) => {
//           return [...prev, doc.data().tag];
//         });
//         setPptList((prev) => {
//           return [...prev, { ...doc.data(), id: doc.id }];
//         });
//       });
//     }
//     fetchPptListFromFirebase();
//   }, []);

//   //FETCH DOCUMENT TEMPLATES FROM FIREBASE
//   useEffect(() => {
//     async function fetchDocListFromFirebase() {
//       const userDataRef = collection(db, "DocumentTemplates");
//       const q = query(userDataRef);
//       const querySnapshot = await getDocs(q);

//       querySnapshot.forEach((doc) => {
//         setDocTagList((prev) => [...new Set([...prev, doc.data().tag])]);
//         setDocList((prev) => {
//           return [...prev, { ...doc.data(), id: doc.id }];
//         });
//       });
//     }
//     fetchDocListFromFirebase();
//   }, []);


// useEffect(()=>{
// if(dataFilter==="All"){setPptToShow(width>1850?pptList.slice(0,4):pptList.slice(0,3));setDocTagToShow(docTagList);return}
// if(dataFilter.toLowerCase()==="pitch deck"){setPptToShow(pptList);setDocTagToShow([]);return}
// if(dataFilter.toLowerCase()==="business validation"){setPptToShow([]);setDocTagToShow(["business validation"]);return}
// if(dataFilter.toLowerCase()==="business plan"){setPptToShow([]);setDocTagToShow(["business plan"]);return}
// if(dataFilter.toLowerCase()==="financial models"){setPptToShow([]);setDocTagToShow(["financial models"]);return}
// if(dataFilter.toLowerCase()==="fundraising"){setPptToShow([]);setDocTagToShow(["fundraising"]);return}
// if(dataFilter.toLowerCase()==="hr"){setPptToShow([]);setDocTagToShow(["hr"]);return}
// if(dataFilter.toLowerCase()==="legal"){setPptToShow([]);setDocTagToShow(["legal"]);return}
// if(dataFilter.toLowerCase()==="startup basics"){setPptToShow([]);setDocTagToShow(["startup basics"]);return}
// },[dataFilter,pptList,docList,width])


//   return (
//     <>
//         {width >= 600 ? (
//         <>
//           <SidebarFinal />
//           <NavBarFinal />
//         </>
//       ) : (
//         <>
//           <PhnSidebar />
//           <KnowledgeNavbar />
//         </>
//       )}
//       <section className={styles.outerCont}>
//         <h1 className={styles.title}>Explore Tools</h1>

//         {/* TAG SORTER */}

//         <div className={styles.chooser}>
//           <section style={{color:dataFilter === "All"&&"#2a72de"}}
//             onClick={() => setDataFilter("All")}
//             className={styles.chooserLink}
//           >
//             All
//             <div
//               style={{ display: dataFilter === "All" ? "" : "none" }}
//               className={styles.underLine}
//             ></div>
//           </section>
//           {list.map((option) => {
//             return (
//               <section style={{color:dataFilter === option&&"#2a72de"}}
//                 key={option}
//                 onClick={() => setDataFilter(option)}
//                 className={styles.chooserLink}
//               >
//                 {option}
//                 <div
//                   style={{ display: dataFilter.toLowerCase() === option.toLowerCase() ? "" : "none" }}
//                   className={styles.underLine}
//                 ></div>
//               </section>
//             );
//           })}
//         </div>

//           <div className={styles.skeletonLoaingCont}>
          
//               {(pptList.length===0&&docList.length===0)&&<ToolsSkeleton cards={6} />}

//           </div>

//           {/* PPT CONT */}
//           {pptToShow.length>0&&<PitchDeck contWidth={width} pptList={pptToShow} dataFilter={dataFilter} setDataFilter={setDataFilter}/>}

// {docTagToShow.map((tag)=>{
//   return <div key={tag}>
//  {/* DOCUMENT CONT */}
//  <BusinessPlan contWidth={width} dataFilter={dataFilter} setDataFilter={setDataFilter} tag={tag}/>
//   </div>
// })}
         
//       </section>
//     </>
    
//   )
// }

// export default Tools
























// By Dhruv (New Tools Page)

import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar';
// import NavBarFinal from '../../components/Navbar/NavBarFinal';
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal';
import { db } from '../../firebase';
import styles from "./Tools.module.css"
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import PitchDeck from './PitchDeck/PitchDeck';
import BusinessPlan from './Business Plan/BusinessPlan';
import ToolsSkeleton from '../../components/Post Skeleton/Tools Skeleton/ToolsSkeleton';
import NavBarFinalDarkMode from '../../components/Navbar Dark Mode/NavBarFinalDarkMode';
import './Tools.module.css'

const list=["Pitch Deck","Business Plan","Business validation","Financial Models","fundraising","HR","Legal","startup basics"]

const Tools = () => {
    const [width, setWidth] = useState(window.innerWidth);
    console.log("width",width)
    const [pptList, setPptList] = useState([]);
    const[docList,setDocList] = useState([]);
    const[pptToShow,setPptToShow]=useState([]);
    const [tagList, setTagList] = useState([]);
    const[docTagList,setDocTagList]= useState([]);
    const[docTagToShow,setDocTagToShow]=useState([])
    const [dataFilter, setDataFilter] = useState("All");
    console.log("pptList",pptList)
    console.log("docList",docList)
    console.log("docTagList",docTagList)
  //UPDATE WIDTH
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []); 
  //FETCH PPT TEMPLATES FROM FIREBASE
  useEffect(() => {
    async function fetchPptListFromFirebase() {
      const userDataRef = collection(db, "PptTemplates");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setTagList((prev) => {
          return [...prev, doc.data().tag];
        });
        setPptList((prev) => {
          return [...prev, { ...doc.data(), id: doc.id }];
        });
      });
    }
    fetchPptListFromFirebase();
  }, []);

  //FETCH DOCUMENT TEMPLATES FROM FIREBASE
  useEffect(() => {
    async function fetchDocListFromFirebase() {
      const userDataRef = collection(db, "DocumentTemplates");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setDocTagList((prev) => [...new Set([...prev, doc.data().tag])]);
        setDocList((prev) => {
          return [...prev, { ...doc.data(), id: doc.id }];
        });
      });
    }
    fetchDocListFromFirebase();
  }, []);


useEffect(()=>{
if(dataFilter==="All"){setPptToShow(width>1850?pptList.slice(0,7):pptList.slice(0,6));setDocTagToShow(docTagList);return}
if(dataFilter.toLowerCase()==="pitch deck"){setPptToShow(pptList);setDocTagToShow([]);return}
if(dataFilter.toLowerCase()==="business validation"){setPptToShow([]);setDocTagToShow(["business validation"]);return}
if(dataFilter.toLowerCase()==="business plan"){setPptToShow([]);setDocTagToShow(["business plan"]);return}
if(dataFilter.toLowerCase()==="financial models"){setPptToShow([]);setDocTagToShow(["financial models"]);return}
if(dataFilter.toLowerCase()==="fundraising"){setPptToShow([]);setDocTagToShow(["fundraising"]);return}
if(dataFilter.toLowerCase()==="hr"){setPptToShow([]);setDocTagToShow(["hr"]);return}
if(dataFilter.toLowerCase()==="legal"){setPptToShow([]);setDocTagToShow(["legal"]);return}
if(dataFilter.toLowerCase()==="startup basics"){setPptToShow([]);setDocTagToShow(["startup basics"]);return}
},[dataFilter,pptList,docList,width])


  return (
    <>
    <div className='toolspage' style={{backgroundColor:'#0b0b2c'}}>

        {width >= 600 ? (
        <>
          {/* <SidebarFinal /> */}
          <div className='navbar'>
            <NavBarFinalDarkMode />
          </div>
        </>
      ) : (
        <><div>
          <PhnSidebar />
          <KnowledgeNavbar />

        </div>
        </>
      )}
      <section className={styles.outerCont}>
        {/* <h1 className={styles.title}>Explore Tools</h1> */}

        {/* TAG SORTER */}

        <div className={styles.chooser}>
          <div className='options'>
          <section style={{color:dataFilter === "All"&&"#2a72de"}}
            onClick={() => setDataFilter("All")}
            className={styles.chooserLink}
          >
            All
            <div
              style={{ display: dataFilter === "All" ? "" : "none" }}
              className={styles.underLine}
            ></div>
          </section>
          </div>
          {list.map((option) => {
            return (
              <section style={{color:dataFilter === option&&"#2a72de"}}
                key={option}
                onClick={() => setDataFilter(option)}
                className={styles.chooserLink}
              >
                <div className='options-bar'>

                {option}
                </div>
                <div
                  style={{ display: dataFilter.toLowerCase() === option.toLowerCase() ? "" : "none" }}
                  className={styles.underLine}
                ></div>
              </section>
            );
          })}
        </div>

          <div className={styles.skeletonLoaingCont}>
          
              {(pptList.length===0&&docList.length===0)&&<ToolsSkeleton cards={6} />}

          </div>

          {/* PPT CONT */}
          {pptToShow.length>0&&<PitchDeck contWidth={width} pptList={pptToShow} dataFilter={dataFilter} setDataFilter={setDataFilter}/>}

{docTagToShow.map((tag)=>{
  return <div key={tag}>
 {/* DOCUMENT CONT */}
 <BusinessPlan contWidth={width} dataFilter={dataFilter} setDataFilter={setDataFilter} tag={tag}/>
  </div>
})}
         
      </section>

      </div>

    </>
    
  )
}

export default Tools
