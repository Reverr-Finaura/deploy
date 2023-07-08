import React,{useEffect, useRef, useState} from 'react'
import styles from "./SharedCommunityPost.module.css"
import closeIcon from "../../images/icons8-cancel-48.png"
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import PostSkeleton from '../../components/Post Skeleton/PostSkeleton'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SharedPostCard from '../../components/Post Card/Shared Post Card/SharedPostCard'
import { useSelector } from 'react-redux'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'


const SharedCommunityPost = () => {
  const user=useSelector((state)=>state.user)
  const chooseFileRef=useRef(null)
  const[imageUpload,setImageUpload]=useState(null)
    const userDoc=useSelector((state)=>state.userDoc)
const [singlepostDataa,setSinglepostDataa]=useState(null)
const[postsData,setPostsData]=useState(null)
const[editSinglePostIsClick,setEditSinglePostIsClick]=useState(false)
const [newEditText,setNewEditText]=useState("")
const [editPostId,setEditPostId]=useState(null)
const[tempImageURL,setTempImageURL]=useState(null)
const[tempSiteUrl,setTempSiteUrl]=useState("")
const postData=[]  

console.log("siteUrl",tempSiteUrl)
//GET SITE URL
useEffect(()=>{
    function getCurrentURL () {
      return window.location.href
    }
    const url = getCurrentURL()
    setTempSiteUrl(url.slice(0,url.indexOf("y")+1))
    const subUrl=url.indexOf("y")
    fetchPostsFromPostData(url.slice(subUrl+2))
  
  },[postData])

  const fetchPostsFromPostData=async(idd)=>{
    const singlePostt=postsData.filter((item)=>{
      return item.id===idd
    })
    setSinglepostDataa(...singlePostt)

  }
 
//  FETCH ALL POSTS DATA
useEffect(()=>{
  async function fetchPostsFromDb(){
    const postRef = collection(db, "Posts");
    const q = query(postRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { 
          postData.push({...doc.data(),id:doc.id});
        });
        setPostsData(postData)
  }
      fetchPostsFromDb()
    },[])



// HANDLE EDIT POST BUTTON CLICK
const handleEditSinglePost=(item,itemId)=>{

  setNewEditText(item.text)
  setEditPostId(itemId)
  if(item.image!==""){setTempImageURL(item.image)}
  
  }

  const chooseFile =()=>{
    if(chooseFileRef.current){
     chooseFileRef.current.click()
    }
    }
//ON IMAGE CHANGE
function onImageChange(e){
  setImageUpload(e.target.files[0])
  const fileURL=(e.target.files[0])
  if (fileURL){

      setTempImageURL(URL.createObjectURL(fileURL))
  }
}

// EDIT POST CHECK
const EditPost=async()=>{
  toast("Processing Your Request")
 
  if(imageUpload===null&&newEditText===""){toast("Nothing To Edit");return;}
  if(imageUpload===null){EditPostInDatabase(tempImageURL);return;}
  else if(imageUpload!==null){
  const imageReff=ref(storage,`Community/Posts/${imageUpload.name+new Date().getTime()}`);
  const uploadTask=uploadBytesResumable(imageReff,imageUpload)
  try {
      await uploadBytes(imageReff,imageUpload)

  // GET URL OF IMAGE UPLOADED IN FIREBASE
await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
  EditPostInDatabase(downloadURL)
})

  } catch (error) {
      toast.error(error.message)
  }
  

}
}

//EDIT POST IN DATABASE

const EditPostInDatabase=async(imageURLL)=>{
  const postRef=doc(db,"Posts",editPostId)

  try {
      await updateDoc(postRef,{image:imageURLL,text:newEditText})
   
      toast("Sucessfully Saved")

      setTimeout(()=>{
window.location.reload()
      },500)
  } catch (error) {
      console.log(error.message)
  }
}



  return (
    <>
    <input onChange={onImageChange} ref={chooseFileRef} type="file" hidden className='postImageUpload' />
        <section id={styles.SharedCommunityPostSection}>
            <section className={styles.SharedCommunityPostContainer}>
            <div className={styles.UserProfilePopupTop}>
                    <img onClick={()=>window.location.replace(`${tempSiteUrl}`)} className={styles.closePopupIcon} src={closeIcon} alt="closePopupIcon" />
                </div>
                
                {singlepostDataa===null&&<div className={styles.PostSkeletonContainer}><PostSkeleton cards={1} /></div>}
                <div className={styles.overFlowContainer}>
                {singlepostDataa===null||editSinglePostIsClick===true?null:<SharedPostCard item={singlepostDataa} postsData={postsData} setPostsData={setPostsData} setEditSinglePostIsClick={setEditSinglePostIsClick} handleEditSinglePost={handleEditSinglePost}/>}

{/* EDIT POST SECTION */}
{editSinglePostIsClick===true?<>
                  <section id={styles.editSinglePostSection}>
                  <div className={styles.editPostContainerEditContainer}>
  <div style={{cursor:"pointer"}} onClick={()=>{setEditSinglePostIsClick(false);setTempImageURL(null);setImageUpload(null)}} className='closeContainerButton'>X</div>
  <section className='uploadPostContainerrrrSection'>
          <div className='EdituploadPostContainerrrr'>
            <img className='community-upload-cont-userImage' src={userDoc?.image?userDoc.image:"https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"} alt="userImage" />
            <div className='textAreaUploadContainer'>
            <div className='navbarUploadPostOuterBoxContainer'>
            <textarea onChange={(e)=>setNewEditText(e.target.value)} name="postText" className='editOldPostTextArea' id="postTextContainerExpanded" rows="3" value={newEditText} placeholder="What Would You Like To Edit?"></textarea>
            {tempImageURL?<div className='edit-communityPostImage-cont'>
            <div className='editImageOverLayContainerImageContainer'>
            <div className='editImageOverLayContainer'></div>
          <img className='edit-communityPostImage' src={tempImageURL} alt="postFile" />
          <button onClick={chooseFile} className='changePhotoIconButton'>Change</button>
          </div>
          
          </div>:null}
            <div className='addImageandUploadPostIcon'>
              
              <button onClick={EditPost} className='uploadPostIconButton'>Save Changes</button>
            </div>
            </div>
            </div>
          </div>
         
          </section>
  </div>
                  </section>
                </>:null}

                </div>
                <ToastContainer/>
            </section>
        </section>
    </>
  )
}

export default SharedCommunityPost