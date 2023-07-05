// import React, { useState } from 'react'
// import styles from "./PitchDeck.module.css"
// import './PitchDeck.module.css'
// import {GrView} from "react-icons/gr"
// import {FiArrowUpRight, FiDownload} from "react-icons/fi"
// import { useNavigate } from 'react-router-dom'

// const PitchDeck = ({pptList,dataFilter,setDataFilter,contWidth}) => {
//   const navigate=useNavigate()
//     const[hover,setHover]=useState(false)
//     const[currentPptIndex,setCurrentPptIndex]=useState(null)


// //HANDLE DOWNLOAD PPT
// const handleDownload = (linkk) => {
//   const link = linkk.split("/")[5];

//   const downloadLink = `https://drive.google.com/uc?export=download&id=${link}`;
//   window.open(downloadLink, "_blank");
// };

// console.log(pptList);


//   return (
//     <section className={styles.outerCont}>
//        <h1 className={styles.title}>Pitch Deck Templates</h1>

//        <div className={styles.pptCont}>
//        {dataFilter==="All"&&<h1 onClick={()=>{setDataFilter("pitch deck");window.scrollTo({ top: 0, behavior: 'smooth' })}} className={styles.loadMoreImg}>See All <span><FiArrowUpRight className={styles.loadMoreImgIcon}/></span></h1>}
       
//       {pptList.map((ppt,idx)=>{return <>
//         <div style={{width:(contWidth<1450&&contWidth>1300)?"30%":""}} onMouseEnter={()=>{setHover(true);setCurrentPptIndex(idx)}} onMouseLeave={()=>{setHover(false);setCurrentPptIndex(null)}} className={styles.pptOuterCont}>
//         <div className={styles.imgCont}>
//         <img className={styles.img} src={ppt?.thumbnail} alt="img" />
//         {(hover&&currentPptIndex===idx)&&
          
//           <div style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ppt?.thumbnail})`,backgroundPosition:"center",backgroundSize:"cover"}} className={styles.blackishCont}>
          
//             <button onClick={() => {navigate(`/pptTemplates/${ppt.id}`);}} className={styles.viewBtn}>View</button>

//           </div>}
//         </div> 
//         <div className={styles.infoCont}>
//           <h3 className={styles.pptName}>{ppt.name}</h3> 


//               <div className={styles.tags}>
//               { ppt.tag.map( (tag, idx) =>{
//                     return(
//                       <>
//                       <button className={styles.tagsButton} key={idx}>{tag}</button>
//                       </>
//                     )

//                   }
//                 )
//               }
//               </div>


//           <div className={styles.btnCont}>
//             <button className={styles.download}>Download</button>
//             <button className='show'>Show</button>
//             {/* <FiDownload onClick={() => {
//               handleDownload(ppt.link);
//             }} className={styles.icon}/>
//             <GrView onClick={() => {
//               navigate(`/pptTemplates/${ppt.id}`);
//             }} className={styles.icon2}/> */}
//           </div> 
//         </div> 
//         </div>
//         </>})}

//        </div>

//     </section>
//   )
// }

// export default PitchDeck

















import React, { useState } from 'react'
import styles from "./PitchDeck.module.css"
import './PitchDeck.module.css'
import {GrView} from "react-icons/gr"
import {FiArrowUpRight, FiDownload} from "react-icons/fi"
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

console.log(pptList);


  return (
    <section className={styles.outerCont}>
       <h1 className={styles.title}>Pitch Deck Templates</h1>

       <div className={styles.pptCont}>
       {dataFilter==="All"&&<h1 onClick={()=>{setDataFilter("pitch deck");window.scrollTo({ top: 0, behavior: 'smooth' })}} className={styles.loadMoreImg}>See All <span><FiArrowUpRight className={styles.loadMoreImgIcon}/></span></h1>}
       
      {pptList.map((ppt,idx)=>{return <>
        <div style={{width:(contWidth<1450&&contWidth>1300)?"30%":""}}  className={styles.pptOuterCont}>
        <div className={styles.imgCont}>
        <img className={styles.img} src={ppt?.thumbnail} alt="img" />
        {/* {(hover&&currentPptIndex===idx)&&
          
          <div style={{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ppt?.thumbnail})`,backgroundPosition:"center",backgroundSize:"cover"}} className={styles.blackishCont}>
          
            <button onClick={() => {navigate(`/pptTemplates/${ppt.id}`);}} className={styles.viewBtn}>View</button>

          </div>} */}
        </div> 
        <div className={styles.infoCont}>
          <h3 className={styles.pptName}>{ppt.name}</h3> 


              <div className={styles.tags}>
              { ppt.tag.map( (tag, idx) =>{
                    return(
                      <>
                      <button className={styles.tagsButton} key={idx}>{tag}</button>
                      </>
                    )

                  }
                )
              }
              </div>


          <div className={styles.btnCont}>
            <button className={styles.download} onClick={() => { handleDownload(ppt.link);}}> Download </button>
            <button onClick={() => {navigate(`/pptTemplates/${ppt.id}`);}} className={styles.viewBtn}>Show</button>
            {/* <FiDownload onClick={() => {
              handleDownload(ppt.link);
            }} className={styles.icon}/>
            <GrView onClick={() => {
              navigate(`/pptTemplates/${ppt.id}`);
            }} className={styles.icon2}/> */}
          </div> 
        </div> 
        </div>
        </>})}

       </div>

    </section>
  )
}

export default PitchDeck