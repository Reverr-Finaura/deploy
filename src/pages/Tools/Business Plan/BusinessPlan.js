
import React, { useEffect, useState } from 'react'
import styles from "./BusinessPlan.module.css"
import {AiOutlineTag} from "react-icons/ai"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import DocSkeleton from '../../../components/Post Skeleton/Doc Skeleton/DocSkeleton'
import { FiArrowUpRight } from 'react-icons/fi'

const BusinessPlan = ({dataFilter,setDataFilter,tag,contWidth}) => {
  const [AllTagDocuments, setAllTagDocuments] = useState([]);
  const[tagDocToShow,setTagDocToShow]=useState([])
  const navigate=useNavigate()
  console.log("dataFilter",dataFilter)
  console.log("AllTagDocuments",AllTagDocuments)


useEffect(()=>{
if(dataFilter==="All"){setTagDocToShow(AllTagDocuments.slice(0,3));return}
setTagDocToShow(AllTagDocuments)
},[dataFilter,AllTagDocuments])


  async function getAllDocuments(tag) {
    const TagDocumentTemplate = await getDocs(
      collection(db, "DocumentTemplates")
    );

    TagDocumentTemplate?.forEach((doc) => {
      if (doc.data().tag.toLowerCase() === tag.toLowerCase()) {
        setAllTagDocuments((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      }
    });
  }

  useEffect(() => {
    getAllDocuments(tag);
  }, [tag]);


  const handleDownload = (linkk) => {
    const link = linkk.split("/")[5];

    console.log(link);
    const downloadLink = `https://drive.google.com/uc?export=download&id=${link}`;
    window.open(downloadLink, "_blank");
  };

  return (
   <>
     <section className={styles.outerCont}>
    
    
    <h1 className={styles.title}>{tag}</h1>
    <div className={styles.docSkeletonCont}>
      {tagDocToShow.length===0&&<DocSkeleton cards={2}/>}
    </div>
    <div className={styles.docCont}>
    {dataFilter==="All"&&<h1 onClick={()=>{setDataFilter("pitch deck");window.scrollTo({ top: 0, behavior: 'smooth' })}} className={styles.loadMoreImg}>See All <span><FiArrowUpRight className={styles.loadMoreImgIcon}/></span></h1>}


    {tagDocToShow.map((doc)=>{
      return <>
    <div style={{width:(contWidth<1450&&contWidth>1300)?"28%":""}} className={styles.doc}>
<h3 className={styles.docHeading}>{doc.title}</h3>
<p className={styles.info}>{doc.description.slice(0,250)}</p>
<div className={styles.tagAndBtnCont}>
  <div className={styles.tagCont}>
    <AiOutlineTag className={styles.tagIcon}/>
    {doc.tag}
  </div>
  <div className={styles.btnCont}>
    <button onClick={() => handleDownload(doc?.link)} className={styles.btn1}>Download Template</button>
    <button onClick={() => navigate(`/documentTemplates/${doc?.id}`)} className={styles.btn}>Show Template</button>
  </div>
</div>
    </div>
</>
    })}
    </div>
    </section>
   </>
  )
}

export default BusinessPlan