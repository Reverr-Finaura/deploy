import React, { useState } from 'react'
import styles from "./PitchDeck.module.css"
import im from "../../../images/Rectangle.png"
import {GrView} from "react-icons/gr"
import {FiDownload} from "react-icons/fi"
import loadMore from "../../../images/Frame 6267252.svg"
import { useNavigate } from 'react-router-dom'
const PitchDeck = ({pptList,dataFilter,setDataFilter,contWidth}) => {
  const navigate=useNavigate()
    const[hover,setHover]=useState(false)
    const[currentPptIndex,setCurrentPptIndex]=useState(null)


//HANDLE DOWNLOAD PPT
const handleDownload = (linkk) => {
  const link = linkk.split("/")[5];

  const downloadLink = `https://drive.google.com/uc?export=download&id=${link}`;
  window.open(downloadLink, "_blank");
};

  return (
    <section className={styles.outerCont}>
       <h1 className={styles.title}>Pitch Deck</h1>

       <div className={styles.pptCont}>
       {dataFilter==="All"&&<img onClick={()=>setDataFilter("pitch deck")} className={styles.loadMoreImg} src={loadMore} alt="loadMore" />}
      {pptList.map((ppt,idx)=>{return <>
        <div style={{width:(contWidth<1450&&contWidth>1300)?"30%":""}} onMouseEnter={()=>{setHover(true);setCurrentPptIndex(idx)}} onMouseLeave={()=>{setHover(false);setCurrentPptIndex(null)}} className={styles.pptOuterCont}>
        <div className={styles.imgCont}>
        <img className={styles.img} src={ppt?.thumbnail} alt="img" />
        {(hover&&currentPptIndex===idx)&&<div style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ppt?.thumbnail})`,backgroundPosition:"center",backgroundSize:"cover"}} className={styles.blackishCont}>
          <button onClick={() => {
              navigate(`/pptTemplates/${ppt.id}`);
            }} className={styles.viewBtn}>View</button>
        </div>}
        </div> 
        <div className={styles.infoCont}>
          <h3 className={styles.pptName}>{ppt.name}</h3> 
          <div className={styles.btnCont}>
            <FiDownload onClick={() => {
              handleDownload(ppt.link);
            }} className={styles.icon}/>
            <GrView onClick={() => {
              navigate(`/pptTemplates/${ppt.id}`);
            }} className={styles.icon2}/>
          </div> 
        </div> 
        </div>
        </>})}

       </div>

    </section>
  )
}

export default PitchDeck