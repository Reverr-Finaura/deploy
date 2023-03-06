
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import ModuleCard from '../Module Card/ModuleCard'
import styles from "./ChooseModuleCard.module.css"

const ChooseModuleCard = ({data,setIsSlideBegin}) => {

    const[isModuleChoosen,setIsModuleChoosen]=useState(false)
    const[moduleData,setModuleData]=useState(null)

const chooseModule=(dataa)=>{
    console.log(dataa)
    setIsModuleChoosen(true)
    setModuleData(dataa)
}


  return (
    <>
    {!isModuleChoosen&&<section className={styles.outerCont}>
        <div className={styles.innerCont}>
            <h1 className={styles.headng}>Choose The Module</h1>
           
            {data.module.map((mod)=>{
                return <>
                    <p onClick={()=>chooseModule(mod)} className={styles.list}>{mod?.title} : {mod?.name}</p>
                </>
            })}
        
            <div className={styles.btnCont}>
        <button onClick={()=>{setIsSlideBegin(false); setIsModuleChoosen(false)}} className={styles.prevBtn}>Prev <span className={styles.iconn}><IoIosArrowForward/></span></button>
        </div>
        </div>
    </section>
    }
    {isModuleChoosen&&<>
        <section><ModuleCard setIsModuleChoosen={setIsModuleChoosen} data={moduleData}/></section>
    </>}
    </>
  )
}

export default ChooseModuleCard