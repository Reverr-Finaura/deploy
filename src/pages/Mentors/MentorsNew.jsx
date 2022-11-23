import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar';
import NavBarFinal from '../../components/Navbar/NavBarFinal';
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal';
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import { db } from '../../firebase';
import "./MentorsNew_Module_Ansh_New.css"
import MentorProfileCard from './MentorProfileCard';
import LoadingMentorCard from './LoadingMentorCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const MentorProfileCard=React.lazy(()=>import('./MentorProfileCard'))


const MentorsNew = () => {

    const [mentorArray, setMentorArray] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
  const[expertiseArray,setExpertiseArray]=useState([])
const uniqueExpertiseArray=[...new Set(expertiseArray)].sort((a,b)=>{if(a<b){return -1}})
const[selectedPriceOption,setSelectedPriceOption]=useState("")
const[selectedExpertiseOption,setSelectedExpertiseOption]=useState([])
const [NewFilteredMentorArrayPriceWise,setNewFilteredMentorArrayPriceWise]=useState([])
const [NewFilteredMentorArrayExpertieWise,setNewFilteredMentorArrayExpertieWise]=useState([])
const [NewFilteredMentorArrayExpertieWiseAfterPriceWise,setNewFilteredMentorArrayExpertieWiseAfterPriceWise]=useState([])
const[isFilterOptionClick,setIsFilterOptionClick]=useState(false)
const[isFilterByPriceOptionClick,setIsFilterByPriceOptionClick]=useState(false)
const[isFilterByExpertiseOptionClick,setIsFilterByExpertiseOptionClick]=useState(false)
const[arrayToBeMapped,setArrayToBeMapped]=useState([])
const[isFiltered,setIsFiltered]=useState(false)
const data = [];



console.log("mentor array",mentorArray)

    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);







//FETCH MENTOR DATA FROM FIREBASE
useEffect(() => {
    async function fetchMentorExpertise() {
      const mentorsRef = collection(db, "Users");
      const q = query(mentorsRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // var mentor = [];
        if (
          doc.data().userType === "Mentor" &&
          doc.data().domain[0] != "" &&
          doc.data().industry != ""
        ) {
          data.push(doc.data());
          // var {email} =doc._document.data.value.mapValue.fields;
          // console.log(email.stringValue);
          // doc.data().id=email;
          // console.log(doc.data());
        }
      });
      setMentorArray(data);
    }
    fetchMentorExpertise();
  }, []);

//FETCH EXPERTISE LIST FROM MENTOR ARRAY
useEffect(()=>{
  mentorArray.map((item)=>{
setExpertiseArray((prev)=>{
  return [...prev,...item?.domain?.slice(0,4)]
})
  })
  setArrayToBeMapped(mentorArray)
},[mentorArray])

//HANDLE PRICE FILTER OPTION CLICK

function handlePriceOptionClick(e){

// if(selectedPriceOption.includes(e.target.id)){
//   const newPriceOptionArray=selectedPriceOption.filter((item)=>{
//     return item!==e.target.id
//   })
//   setSelectedPriceOption(newPriceOptionArray)
//   return;
// }
if(selectedPriceOption===e.target.id){
  setSelectedPriceOption("")
  return;
}
setSelectedPriceOption(e.target.id)
  // setSelectedPriceOption((prev)=>{
  //   return [e.target.id]
  // })
}

//HANDLE EXPERTISE FILTER OPTION CLICK

function handleExpertiseOptionClick(item){
  if(selectedExpertiseOption.includes(item)){
   const newExpertiseoption= selectedExpertiseOption.filter((name)=>{
      return name!==item
    })
    setSelectedExpertiseOption(newExpertiseoption)
    return;
  }
  setSelectedExpertiseOption((prev)=>{
    return [...prev,item]
  })
}

//HANDLE FILTER SEARCH BUTTON CLICK

function handleFilterSearchButtonClick(){
if(selectedPriceOption.length===0){
  if(selectedExpertiseOption.length===0){
    toast("Kindly Select some options")
    return;
  }
 setNewFilteredMentorArrayExpertieWise([])
 
  filterMentorArrayForExpertiseOption(mentorArray)
  setIsFiltered(current=>!current)
  return;
}
if(selectedExpertiseOption.length===0){
  if(selectedPriceOption.length===0){
    toast("Kindly Select some options") 
    return;
  }
  setNewFilteredMentorArrayPriceWise([])
 
  filterMentorArrayForPriceOption()
  setIsFiltered(current=>!current)
  return;
}

setNewFilteredMentorArrayPriceWise([])
setNewFilteredMentorArrayExpertieWise([])
setNewFilteredMentorArrayExpertieWiseAfterPriceWise([])

filterMentorArrayForBothOptions()
setIsFiltered(current=>!current)
}

//FILTER ARRAY FOR EXPERTISE OPTIONS
function filterMentorArrayForExpertiseOption(arrayName){
  selectedExpertiseOption.map((item)=>{
    arrayName.map((itemss)=>{
  if(itemss.domain.includes(item)){
if(NewFilteredMentorArrayExpertieWise.includes(itemss)){return;}
setNewFilteredMentorArrayExpertieWise((prev)=>{
  return [...prev,itemss]
})
  }
})
  })
  setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)
  setSelectedExpertiseOption([])
}

//FILTER ARRAY FOR PRICE OPTIONS

function filterMentorArrayForPriceOption(){
if(selectedPriceOption===("500")){
  const newMentors=  mentorArray.filter((itemss)=>{
    return (itemss.plans[0]/2<=500)
          })
          setNewFilteredMentorArrayPriceWise(newMentors)
          setSelectedPriceOption("")
          setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)
          return;
}
if(selectedPriceOption===('501-750')){
  const newMentors=  mentorArray.filter((itemss)=>{
    return (itemss.plans[0]/2>500&&itemss.plans[0]/2<=750)
          })
          setNewFilteredMentorArrayPriceWise(newMentors)
           setSelectedPriceOption("")
           setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)
          return;
}
if(selectedPriceOption===('751-1000')){
  const newMentors=  mentorArray.filter((itemss)=>{
    return (itemss.plans[0]/2>750&&itemss.plans[0]/2<=1000)
          })
          setNewFilteredMentorArrayPriceWise(newMentors)
           setSelectedPriceOption("")
           setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)
          return;
}
if(selectedPriceOption===('1001-1500')){
  const newMentors=  mentorArray.filter((itemss)=>{
    return (itemss.plans[0]/2>1000&&itemss.plans[0]/2<=1500)
          })
          setNewFilteredMentorArrayPriceWise(newMentors)
           setSelectedPriceOption("")
           setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)
          return;
}
if(selectedPriceOption===("1500+")){
  const newMentors=  mentorArray.filter((itemss)=>{
    return (itemss.plans[0]/2>1500)
          })
          setNewFilteredMentorArrayPriceWise(newMentors)
           setSelectedPriceOption("")
           setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)
          return;
}
  
//   const NewFilterMentorArray=selectedPriceOption.map((item)=>{
//     if(item==="500"){
//     const newMentors=  mentorArray.filter((itemss)=>{
// return (itemss.plans[0]/2<=500)
//       })
//       setNewFilteredMentorArrayPriceWise((prev)=>{
//         return [...prev,...newMentors]
//       })
//     }
//   })
}

//FILTER ARRAY FOR BOTH OPTIONS
function filterMentorArrayForBothOptions(){
  if(selectedPriceOption===("500")){
    const newMentors=  mentorArray.filter((itemss)=>{
      return (itemss.plans[0]/2<=500)
            })
            filterMentorArrayForExpertiseOptionAfterPricing(newMentors)
            return;
  }
  if(selectedPriceOption===('501-750')){
    const newMentors=  mentorArray.filter((itemss)=>{
      return (itemss.plans[0]/2>500&&itemss.plans[0]/2<=750)
            })
            filterMentorArrayForExpertiseOptionAfterPricing(newMentors)
            return;
  }
  if(selectedPriceOption===('751-1000')){
    const newMentors=  mentorArray.filter((itemss)=>{
      return (itemss.plans[0]/2>750&&itemss.plans[0]/2<=1000)
            })
            filterMentorArrayForExpertiseOptionAfterPricing(newMentors)
            return;
  }
  if(selectedPriceOption===('1001-1500')){
    const newMentors=  mentorArray.filter((itemss)=>{
      return (itemss.plans[0]/2>1000&&itemss.plans[0]/2<=1500)
            })
            filterMentorArrayForExpertiseOptionAfterPricing(newMentors)
            return;
  }
  if(selectedPriceOption===("1500+")){
    const newMentors=  mentorArray.filter((itemss)=>{
      return (itemss.plans[0]/2>1500)
            })
            filterMentorArrayForExpertiseOptionAfterPricing(newMentors)
            return;
  }
}

//FILTER ARRAY FOR EXPERTISE OPTIONS AFTER PRICING IS CHECKED
function filterMentorArrayForExpertiseOptionAfterPricing(arrayName){
  let array=[]
  selectedExpertiseOption.map((item)=>{
    arrayName.map((itemss)=>{
  if(itemss.domain.includes(item)){
if(NewFilteredMentorArrayExpertieWise.includes(itemss)){return;}
setNewFilteredMentorArrayExpertieWiseAfterPriceWise((prev)=>{
  return [...prev,itemss]
})
array.push(itemss)
  }
})
  })
 

if(array.length===0){toast("No Result Found"); return}
  setSelectedExpertiseOption([])
  setSelectedPriceOption("")
  setIsFilterOptionClick(false)
setIsFilterByPriceOptionClick(false)
setIsFilterByExpertiseOptionClick(false)

}

//CHECK IF FILTERING IS DONE OR NOT
useEffect(()=>{
  if(NewFilteredMentorArrayExpertieWise.length!==0){
    setArrayToBeMapped(NewFilteredMentorArrayExpertieWise)
      return
  }
  if(NewFilteredMentorArrayPriceWise.length!==0){
    setArrayToBeMapped(NewFilteredMentorArrayPriceWise)
      return
  }
  if(NewFilteredMentorArrayExpertieWiseAfterPriceWise.length!==0){
    setArrayToBeMapped(NewFilteredMentorArrayExpertieWiseAfterPriceWise)
      return
  }
  // if(selectedPriceOption.length===0){
  //   if(selectedExpertiseOption.length!==0){
  //     setArrayToBeMapped(NewFilteredMentorArrayExpertieWise)
  //     return
  //   }
  //   return
  // }
  // if(selectedExpertiseOption.length===0){
  //   if(selectedPriceOption.length!==0){
  //     setArrayToBeMapped(NewFilteredMentorArrayPriceWise)
  //     return
  //   }
  //   return
  // }
  // if(selectedExpertiseOption.length!==0&&selectedPriceOption.length!==0)
  // {setArrayToBeMapped(NewFilteredMentorArrayExpertieWiseAfterPriceWise)}
  
},[isFiltered])




  return (
    <>
{width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}
          <div className='MentorstitleAndFilterCont'>
          <ToastContainer />
          <h1 className='find-best-mentor-heading'>Find the Best Mentor</h1>
          <div className='mentorFilterCardCont'>
          <button onClick={()=>setIsFilterOptionClick(current=>!current)} className='MentorsFilterButton'>FILTER</button>
          </div>
          </div>
        {isFilterOptionClick?<>

        
          <div className='priceAndExpertiseFilterCont'>
          <div className='sortContainer'>
          <div className='ByPriceFilterCont'>
          <div onClick={()=>setIsFilterByPriceOptionClick(current=>!current)} className='ByPriceFilter'>Sort : By Price <img className='down-triangle-image' src="./images/down-filled-triangular-arrow.png" alt="down-triangle" /></div>
          {isFilterByPriceOptionClick?
          <div className='price-filter-option-cont'>
          <h1 onClick={handlePriceOptionClick} className={selectedPriceOption==="500"?"price-filter-option-selected":'price-filter-option'} id="500">₹500</h1>
          <h1 onClick={handlePriceOptionClick} className={selectedPriceOption===('501-750')?"price-filter-option-selected":'price-filter-option'} id='501-750'>₹501 - ₹750</h1>
          <h1 onClick={handlePriceOptionClick} className={selectedPriceOption===('751-1000')?"price-filter-option-selected":'price-filter-option'} id='751-1000'>₹751 - ₹1000</h1>
          <h1 onClick={handlePriceOptionClick} className={selectedPriceOption===('1001-1500')?"price-filter-option-selected":'price-filter-option'} id='1001-1500'>₹1001 - ₹1500</h1>
          <h1 onClick={handlePriceOptionClick} className={selectedPriceOption===('1500+')?"price-filter-option-selected":'price-filter-option'} id='1500+'>₹1500 +</h1>
          </div>
          :null}
          </div>
          <div className='ByExpertiseFilterCont'>
          <div onClick={()=>setIsFilterByExpertiseOptionClick(current=>!current)} className='ByExpertiseFilter'>Sort : By Expertise <img className='down-triangle-image-expertise' src="./images/down-filled-triangular-arrow.png" alt="down-triangle" /></div>
          {isFilterByExpertiseOptionClick?
          <div className='expertise-filter-option-cont'>
          {uniqueExpertiseArray.map((item,index)=>{
            return   <div onClick={()=>handleExpertiseOptionClick(item)} className={selectedExpertiseOption.includes(item)?"expertise-filter-option-selected":'expertise-filter-option'} key={index}>{item}</div>
          })}
          </div>
          :null}
          </div>
          </div>
            <button onClick={handleFilterSearchButtonClick} className='mentorsSearchFilter'>Filter Search</button>
          </div>
          </>:null}
          {/* <div className='loadingAnimationContainer'>
<LoadingMentorCard />
<LoadingMentorCard />
<LoadingMentorCard />
<LoadingMentorCard />
</div> */}
<section id='mentors-page-new'>

<div className='mentors-page-card-container'>


{arrayToBeMapped.map((item,index)=>{
    return <>
    <MentorProfileCard key={index} item={item} index={index}/>
    </>
})}


</div>

</section>
    </>
  )
}

export default MentorsNew