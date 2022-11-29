import React, { useEffect, useRef, useState } from 'react'
import "./CommunityFinal.css"
import KnowledgeNavbar from '../../components/KnowledgeNavbar/KnowledgeNavbar'
import NavBarFinal from '../../components/Navbar/NavBarFinal'
import SidebarFinal from '../../components/Sidebar Final/SidebarFinal'
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import BlogCard from "../Blog Card/BlogCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingMentorsCard from "../Mentors/LoadingMentorCard"
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostCard from '../../components/Post Card/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDoc } from '../../features/userDocSlice'

const CommunityFinal = () => {
    const dispatch =useDispatch()
    const postData=[];
    const [width, setWidth] = useState(window.innerWidth);
    const [postsData,setPostsData]=useState([])
    const[imageUpload,setImageUpload]=useState(null)
    const[tempImageURL,setTempImageURL]=useState(null)
    const chooseFileRef=useRef(null)
    const[newPostText,setNewPostText]=useState("")
    const user=useSelector((state)=>state.user)
    const userDoc=useSelector((state)=>state.userDoc)
    const[newPostdataId,setNewPostDataId]=useState([])
    const[editPostButtonClick,setEditPostButtonClick]=useState(false)
    const [newEditText,setNewEditText]=useState("")
    const [editPostId,setEditPostId]=useState(null)

 
console.log("userDoc",userDoc)

    const updateWidth = () => {
        setWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);


 
// CHECK FOR USER DOC DATA
useEffect(()=>{
    async function fetchUserDocFromFirebase(){
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);
     
      querySnapshot.forEach((doc) => {

       if(doc.id===user?.user?.email){
        dispatch(setUserDoc(doc.data())); 
       }
      }); 
    }
  fetchUserDocFromFirebase()
  },[user])

//CHECK IF USERDOC HAS POSTS
useEffect(()=>{
if(userDoc?.posts){setNewPostDataId(userDoc?.posts);return}

},[userDoc])


//FETCH POSTS DATA FROM FIREBASE

useEffect(()=>{
    async function fetchBlogsFromDb(){
      const postRef = collection(db, "Posts");
      const q = query(postRef);
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => { 
            postData.push({...doc.data(),id:doc.id});
          });
          setPostsData(postData)
    }
        fetchBlogsFromDb()
      },[])



//Pagination
const[pageNumber,setPageNumber]=useState(0)
const notesPerPage=6;
const pagesVisited=pageNumber*notesPerPage
const displayPosts=postsData.slice(0,pagesVisited+notesPerPage)
// const pageCount=Math.ceil(postsData.length/notesPerPage)
const fetchMorePosts=()=>{
    setTimeout(()=>{
        setPageNumber(pageNumber+1)
    },800)
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
// UPLOAD IMAGE TO FIREBASE

const uploadImageToFireBase=async()=>{
    if(imageUpload===null&&newPostText===""){toast("Nothing To Post");return;}
    toast("Processing Your Request")
    if(imageUpload===null){createNewPost("");return;}
    else if(imageUpload!==null){
    const imageReff=ref(storage,`Community/Posts/${imageUpload.name+new Date().getTime()}`);
    const uploadTask=uploadBytesResumable(imageReff,imageUpload)
    try {
        await uploadBytes(imageReff,imageUpload)

    // GET URL OF IMAGE UPLOADED IN FIREBASE
await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    createNewPost(downloadURL)
})

    } catch (error) {
        toast.error(error.message)
    }
    

}

}

//UPLOAD NEW POST TO FIREBASE
const createNewPost=async (item)=>{
   const userRef=doc(db,"Users",user?.user?.email)
  toast("Processing Your Request")
   try {
    const timeId=new Date().getTime().toString()
    let newPostId=[...newPostdataId]
   
    await setDoc(
        doc(db, "Posts",timeId),{
            comments:[],
            createdAt:new Date(),
            image:item,
            likes:[],
            postedby:userRef,
            text:newPostText
        })
    newPostId.push(timeId)
   
        updateUserDatabase(newPostId)
    

    
   } catch (error) {
    console.log(error.message)
   }
    
}

//UPDATE USER DATABSE IN FIREBASE

const updateUserDatabase=async (id)=>{
    const userDocumentRef=doc(db,"Users",user?.user?.email)
    
    try {
        await updateDoc(userDocumentRef,{posts:id})
    
        toast("Sucessfully Posted")
        setTimeout(()=>{
window.location.reload()
        },500)
    } catch (error) {
        console.log(error.message)
    }
}

// HANDLE EDIT POST BUTTON CLICK
const handleEditPostButtonClick=(item,itemId)=>{

setEditPostButtonClick(true)
setNewEditText(item.text)
setEditPostId(itemId)
if(item.image!==""){setTempImageURL(item.image)}

}

// EDIT POST CHECK
const EditPost=async()=>{
    toast("Processing Your Request")
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
     
        toast("Sucessfully Editted")

        setTimeout(()=>{
window.location.reload()
        },500)
    } catch (error) {
        console.log(error.message)
    }
}


  return (
    <>
        {width>=600?<><SidebarFinal /><NavBarFinal/></>:<><PhnSidebar />
          <KnowledgeNavbar /></>}

          <section id='communityFinalPage'>
          <ToastContainer/>
          <input onChange={onImageChange} ref={chooseFileRef} type="file" hidden className='postImageUpload' />
          {editPostButtonClick?
            <>
          <h2 id='EditPostHeading'>Edit Post</h2>
          <section className='uploadPostContainer'>
          {tempImageURL?<div className='communityPostImage-cont'>
          <img className='communityPostImage' src={tempImageURL} alt="postFile" />
          </div>:null}
            <textarea onChange={(e)=>setNewEditText(e.target.value)} name="postText" id="postTextContainer" rows="3" value={newEditText}></textarea>
          </section>
          </>
          :
          <>
          <h2>Upload New Post</h2>
          <section className='uploadPostContainer'>
          {tempImageURL?<div className='communityPostImage-cont'>
          <img className='communityPostImage' src={tempImageURL} alt="postFile" />
          </div>:null}
            <textarea onChange={(e)=>setNewPostText(e.target.value)} name="postText" id="postTextContainer" rows="3" value={newPostText}></textarea>
          </section>
          </>}
          <button onClick={chooseFile}>Choose Image</button>
          {editPostButtonClick?
          <button onClick={EditPost}>Edit</button>
          :
          <button onClick={uploadImageToFireBase}>Upload</button>
          }

          <InfiniteScroll dataLength={displayPosts.length} next={fetchMorePosts} hasMore={displayPosts.length!==postsData.length} loader={<div className='loading-card-container'><LoadingMentorsCard /><LoadingMentorsCard /></div>}>
          
          <section className="posts-containerr">
          <h4 style={{marginBottom:"2rem",marginTop:"2rem",width:"80%"}} className="course-container-heading">Posts</h4>
          {displayPosts.length===0&&<div className='loading-card-container'><LoadingMentorsCard /><LoadingMentorsCard /></div>}

  {displayPosts.map((item,index)=>{
    return <PostCard postsData={postsData} setPostsData={setPostsData} item={item} key={index} handleEditPostButtonClick={handleEditPostButtonClick} />
  })}
</section>
          </InfiniteScroll>
   
   
          </section>
    </>

  )
}

export default CommunityFinal