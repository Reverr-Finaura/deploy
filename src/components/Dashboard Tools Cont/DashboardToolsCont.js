import styles from "./DashboardToolsCont.module.css"
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import loadMore from "../..//images/Frame 6267252.svg"
import { useNavigate } from "react-router-dom";

const DashboardToolsCont = () => {
    const [pptList,setPPtList]=useState([])
    const navigate=useNavigate()
 //FETCH PPT TEMPLATES FROM FIREBASE
 useEffect(() => {
    async function fetchPptListFromFirebase() {
      const userDataRef = collection(db, "PptTemplates");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setPPtList((prev) => {
          return [...prev, { ...doc.data(), id: doc.id }];
        });
      });
    }
    fetchPptListFromFirebase();
  }, []);




  return (
    <section className={styles.outerCont}>
        <h1>Tools</h1>
        <img onClick={()=>navigate("/tools")}  className={styles.loadMoreImg} src={loadMore} alt="load" />
        <p>Create,edit ,download the presentation and document templates.</p>
        <div className={styles.pptCont}>
        {pptList?.slice(0,1).map((ppt)=>{
            return <>
            <div onClick={()=>navigate("/tools")} key={ppt.id} className={styles.pptCard}>
            <img className={styles.pptImg} src={ppt.thumbnail} alt="pptImg" />
            <p className={styles.pptText}>Pitch Deck</p>
            </div>
            </>
        })} 
        {pptList?.slice(1,3).map((ppt)=>{
            return <>
            <div onClick={()=>navigate("/tools")} key={ppt.id} className={styles.pptCard}>
            <img className={styles.pptImg} src={ppt.thumbnail} alt="pptImg" />
            <p className={styles.pptText}>Document</p>
            </div>
            </>
        })}    
        </div>
    </section>
  )
}

export default DashboardToolsCont