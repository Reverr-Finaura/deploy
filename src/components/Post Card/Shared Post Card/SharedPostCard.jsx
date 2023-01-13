import React, { useEffect, useState } from 'react'
import { db, getUserDocByRef } from '../../../firebase'
import styles from "./SharedPostCard.module.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LikedIcon from '../../Like And Liked Icon/LikedIcon';
import LikeIcon from '../../Like And Liked Icon/LikeIcon';
import { useSelector } from 'react-redux';
import commentIcon from "../../../images/postCommentIcon.png"
import sendIcon from "../../../images/paper-plane.png"
import threeDotsIcon from "../../../images/dots.png"
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FaComments } from 'react-icons/fa'
import {RiShareForwardFill} from "react-icons/ri"
import {TfiMoreAlt} from "react-icons/tfi"
import {AiTwotoneLike} from "react-icons/ai"
import {AiOutlineLike} from "react-icons/ai"

const SharedPostCard = ({item,setPostsData,postsData,setEditSinglePostIsClick,handleEditSinglePost}) => {

    const user=useSelector((state)=>state.user)
    const userDoc=useSelector((state)=>state.userDoc)
    const[postUserDetail,setPostUserDetail]=useState({})
    const[commentedByUserDetail,setCommentedByUserDetail]=useState([])
    const[singlePostTime,setSinglePostTime]=useState("")
    const[ShowMorePostText,setShowMorePostText]=useState(false)
    const[threeDotsClicked,setThreeDotsClicked]=useState(false)
    const[singlePostCommentIconClick,setsinglePostCommentIconClick]=useState(false)
    const[singlePostNewComment,setSinglePostNewComment]=useState("")
    const[CommentThreeDotsClicked,setCommentThreeDotsClicked]=useState(false)
    const[PostThreeDotsClickCommentId,setPostThreeDotsClickCommentId]=useState(null)
    const[editCommentButtonIsClick,setEditCommentButtonIsClick]=useState(false)
    const[newEdittedComment,setNewEdittedComment]=useState("")
const[editCommentId,setEditCommentId]=useState(null)
const[tempSiteUrl,setTempSiteUrl]=useState("")

    console.log("item",item)

//GET SITE URL
useEffect(()=>{
    function getCurrentURL () {
        return window.location.href
      }
      const url = getCurrentURL()
      setTempSiteUrl(url.slice(0,url.indexOf("y")+1))
},[])


//GET USER DATA FROM REFERENCE LINK WHO HAS POSTED

useEffect(()=>{
 
    getUserDocByRef(item?.postedby).then((res)=>{
        
        setPostUserDetail(res)
    })  


},[item])

//GET USER DATA FROM REFERENCE LINK WHO HAS COMMENTED

useEffect(()=>{
 item?.comments?.map((event)=>{
    getUserDocByRef(event.commentedby).then((res)=>{
        setCommentedByUserDetail((prev)=>{
            return [...prev,res]
        })
    })  
 })

},[item])

 // HANDLE POST SEND CLICK

const handleSendPostLinkClick=(id)=>{
    var url = `${tempSiteUrl}/${id}`;
navigator.clipboard.writeText(url).then(function() {
  toast("Link Copied To ClipBoard");
}, function(err) {
  console.error('Could not copy text: ', err);
});
}

//GET TIME OF POST
useEffect(()=>{
    setSinglePostTime(new Date(item?.createdAt.seconds*1000))
},[item])

//CHECK IF POST LIKES CONTAIN USER OR NOT
const getLikedPostIdFromFirebase=async(id,items)=>{
    let newLikeArray ;
   
    if (items.likes.includes(user?.user?.email)){newLikeArray=items.likes.filter((item)=>{
       return item!==user?.user?.email
    })
    setPostsData(postsData.map((item)=>{
       if(item.id===id){return {...item,likes:newLikeArray}}
       else return item;
      }))
    updateLikedPostInFirebase(newLikeArray,id)
   
    return
   }
   newLikeArray=items.likes.concat([user?.user?.email])
   
   setPostsData(postsData.map((item)=>{
       if(item.id===id){return {...item,likes:newLikeArray}}
       else return item;
      }))
   updateLikedPostInFirebase(newLikeArray,id)
   
   return
      
   }
   
   //UPDATE POST LIKE PART DATABASE
   const updateLikedPostInFirebase=async (data,id)=>{
       
   
       const userDocumentRef=doc(db,"Posts",id)
   
       try {
           await updateDoc(userDocumentRef,{likes:data})
          
          
       } catch (error) {
           console.log(error.message)
       }
   }
// HANDLE DELETE POST BUTTON CLICK
const handleDeletePostButtonClick=async(itemId)=>{
    toast("Processing Your Request")
    setThreeDotsClicked(false)
    const postsRef=doc(db,"Posts",itemId)
    await deleteDoc(postsRef)
    
    const newPostIdArray=userDoc.posts.filter((item)=>{
        return item!==itemId
    })
    
    updateUserDatabaseAgain(newPostIdArray)
    }
    
    //UPDATE USER DATABSE IN FIREBASE
    
    const updateUserDatabaseAgain=async (id)=>{
        const userDocumentRef=doc(db,"Users",user?.user?.email)
        
        try {
            await updateDoc(userDocumentRef,{posts:id})
           
            toast("Deleted Post")
            setTimeout(()=>{
                window.location.replace(`${tempSiteUrl}`)
            },500)
        } catch (error) {
            console.log(error.message)
        }
    }

//HANDLE NEW COMMENT ON POST

const handleNewCommentonPost=async (item,id)=>{

    const userRef=doc(db,"Users",user?.user?.email)
    let newCommentArray
    if(singlePostNewComment===""){toast("Nothing to Comment");return}
    newCommentArray=item.comments.concat([{comment:singlePostNewComment,commentedby:userRef,commentid:new Date().getTime()}])
    setPostsData(postsData.map((item)=>{
        if(item.id===id){return {...item,comments:newCommentArray}}
        else return item;
       }))
    updateCommentInFirebase(newCommentArray,id)
    setSinglePostNewComment("")    
    
    }
    //UPDATE NEWCOMMENT IN FIREBASE
    const updateCommentInFirebase=async (data,id)=>{
        
    
        const userDocumentRef=doc(db,"Posts",id)
    
        try {
            await updateDoc(userDocumentRef,{comments:data})
           
           setSinglePostNewComment("")
        } catch (error) {
            console.log(error.message)
        }
    }
    


//DELETE COMMENT ON POST CLICK

const handleDeleteCommentClick=(commentId,item,itemId)=>{
    const newCommentArray=item.comments.filter((event)=>{
        return event.commentid!==commentId
    })
    
    setPostsData(postsData.map((item)=>{
      
        if(item.id===itemId){return {...item,comments:newCommentArray}}
      
        else return item
    }))
    updateDeleteCommentInFirebase(newCommentArray,itemId)
    }
    
    //UPDATE DELTECOMMENT IN FIREBASE
    const updateDeleteCommentInFirebase=async (data,id)=>{
       
    
        const userDocumentRef=doc(db,"Posts",id)
    
    
        try {
            await updateDoc(userDocumentRef,{comments:data})
           toast("Sucessfully Deleted") 
        } catch (error) {
            console.log(error.message)
        }
    }
    
    



//HANDLE EDIT COMMENT BUTTON CLICK

const handleEditCommentClick=(commentId,comment)=>{

    setEditCommentButtonIsClick(true)
    setNewEdittedComment(comment.comment)
    setEditCommentId(commentId)
    }
    
    const handleEditCommentonPost=(item,itemId)=>{
    
    let newEditCommentArray
    
    if(newEdittedComment===""){toast("Nothing To Edit");return}
    
    newEditCommentArray=item.comments.map((event)=>{
    
        if(event.commentid===editCommentId){return {...event,comment:newEdittedComment}}
        else return event;
    })
    setPostsData(postsData.map((item)=>{
      
        if(item.id===itemId){return {...item,comments:newEditCommentArray}}
      
        else return item
    }))
    updateEdittedCommentInFirebase(newEditCommentArray,itemId)
    }

//UPDATE NEWEDIITEDCOMMENT IN FIREBASE
const updateEdittedCommentInFirebase=async (data,id)=>{
   

    const userDocumentRef=doc(db,"Posts",id)


    try {
        await updateDoc(userDocumentRef,{comments:data})
       toast("Sucessfully Editted") 
       setEditCommentButtonIsClick(false)
setNewEdittedComment("")
setSinglePostNewComment("")
setEditCommentId(null)
    } catch (error) {
        console.log(error.message)
    }
}

  return (
    <>

<section id={styles.SharedPostCard}>
<div style={{alignItems:"center"}} className={styles.SharedPostCardTop}>
<img style={{width:"40px",height:"40px",borderRadius:"50%",marginRight:"1rem"}} src={postUserDetail?.image?postUserDetail?.image:"https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"} alt="userIcon" />
<div className='postUserDetail'>
    <h3 className={styles.postAuthorName}>{postUserDetail?.name}</h3>
    <p className={styles.postAuthorDesignation}>{postUserDetail?.designation?postUserDetail?.designation:""}</p>
    </div>
    <div className={styles.postUploadDateContainer}>
    {new Date(item?.createdAt?.seconds*1000).toDateString().slice(4)}
    {/* {
        new Date(singlePostTime)?.getFullYear()!==new Date().getFullYear()?((new Date().getFullYear()- new Date(singlePostTime)?.getFullYear())+" Year ago"):
        singlePostTime?.getMonth()+1!==new Date().getMonth()+1?(((new Date().getMonth()+1)-(singlePostTime?.getMonth()+1))+" Month ago"):
        singlePostTime?.getDate()!==new Date().getDate()?((new Date().getDate()-singlePostTime?.getDate())+" Day ago"):
        new Date(singlePostTime).getHours()!==new Date().getHours()?(new Date().getHours()-
        new Date(singlePostTime).getHours())+" Hour Ago":
        new Date(singlePostTime).getMinutes()!==new Date().getMinutes()?(new Date().getMinutes()-
        new Date(singlePostTime).getMinutes())+" Minute Ago":
        new Date(singlePostTime).getSeconds()!==new Date().getSeconds()?(new Date().getSeconds()-
        new Date(singlePostTime).getSeconds())+" Second Ago":""} */}
        </div>
</div>
<div className={styles.postTextContainer}>
    {item?.text.length>100?<h3 className={styles.postText}>{ShowMorePostText?item?.text:<>{item?.text.slice(0,100)}<span onClick={()=>setShowMorePostText(true)} className={styles.morePostTextButton}>...continue</span> </>}</h3>
    :<h3 className={styles.postText}>{item?.text}</h3>}  
    </div>
    {item?.image? <div className={styles.postImageContainer}>
        <img className={styles.postImage} src={item?.image} alt="postImage" />
    </div>:null}

{/* POST LIKE AND COMMENT SECTION */}
<div className={styles.postLikesAndCommentContainer}>
<div className={styles.postLikesContainer}>
        <div onClick={()=>{getLikedPostIdFromFirebase(item.id,item)}} className={styles.postLikesContainerLikeIcon}>{item?.likes.includes(user?.user?.email)?<AiTwotoneLike className='postLikesContainerLikedIconn'/>:<AiOutlineLike className='postLikesContainerLikeIconn'/>}</div>
        <p className={styles.postSharedLikeCountText}>{item?.likes.length<=1?"Like":"Likes"}</p>
            <h3 className={styles.postLikeCount}>{item?.likes.length}</h3>
        </div>
        <div className={styles.postCommentContainer}>
        <div className={styles.commentContainer}>
        <FaComments onClick={()=>setsinglePostCommentIconClick(current=>!current)} className={styles.commentPostIconn}/>
        {/* <img onClick={()=>setsinglePostCommentIconClick(current=>!current)} src={commentIcon} alt='commentIcon' className={styles.commentPostIcon}/> */}
        </div>
        <p className='postLikeCountText'>{item?.comments.length<=1?"Comment":"Comments"}</p>
            <h3 className={styles.postCommentCount}>{item?.comments.length}</h3>
        </div>
{/* SEND POST SECTION */}
        <div onClick={()=>handleSendPostLinkClick(item.id)} className={styles.postSendLinkContainer}>
<div className={styles.postSendCont}>
    <div className={styles.postSendIcon}>
        {/* <img style={{width:"100%",height:"100%"}} src={sendIcon} alt="sendIcon" /> */}
        <RiShareForwardFill style={{fontSize:"1.8rem"}}/>
    </div>
    <h3 className={styles.postSendText}>Share</h3>
</div>
        </div>

   {/* 3 DOTS SECTION      */}
   <div className={styles.threeDotsMainCont}>
        <div className={styles.threeDotsContainer}>
        {/* <img onClick={()=>setThreeDotsClicked(current=>!current)} className={styles.threeDotsPost} src={threeDotsIcon} alt="3dots" /> */}
        <div style={{display:"flex"}}>
        <TfiMoreAlt  onClick={()=>setThreeDotsClicked(current=>!current)} className='threeDotsPostt'/>
        <p className={styles.moreRandomText}>More</p>
        </div>
        
       {threeDotsClicked?
       <div className={user?.user?.email===item?.postedby?.id?styles.threeDotsOptions:styles.standardThreeDotsOption}>
       
            {user?.user?.email===item?.postedby?.id?<div onClick={()=>handleDeletePostButtonClick(item.id)} className={styles.threeDotsDeletePostOption}>
                Delete Post
            </div>:null}
            {user?.user?.email===item?.postedby?.id?<a style={{textDecoration:"none",color:"black",margin:"auto"}}><div onClick={()=>{handleEditSinglePost(item,item.id);setThreeDotsClicked(false);setEditSinglePostIsClick(true)}} className={styles.threeDotsEditPostOption}>
                Edit Post
            </div>
            </a>:null}
            <div className={styles.threeDotsReportPostOption}>
                Report Post
            </div>
        </div>
        :null} 
        </div>
        </div>
</div>
</section>

{/* COMMENT SECTION */}
<section className={styles.newCommentOnPostSection}>
{editCommentButtonIsClick?
    <section className='uploadPostContainerrrrSection'>
          <div className='newCommentContainerrrr'>
            <img className='community-newComment-cont-userImage' src={userDoc?.image?userDoc.image:"https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"} alt="userImage" />
            <div className='textAreaUploadContainer'>
            <div>
            <textarea onChange={(e)=>setNewEdittedComment(e.target.value)} name="newEditComment" id="postCommentContainerExpanded" rows="3" placeholder="Share Your Thoughts" value={newEdittedComment}></textarea>
            <div className='addImageandUploadPostIcon newCommentAddImageAndUpload'>
              <button onClick={()=>handleEditCommentonPost(item,item.id)} className='uploadPostIconButton'>Edit</button>
            </div>
            </div>
            </div>
          </div>
          </section>:
<section style={{display:singlePostCommentIconClick?"":"none"}} className={styles.uploadPostContainerrrrSection}>
          <div className={styles.newCommentContainerrrr}>
            <img className={styles.communityNewCommentContUserImage} src={userDoc?.image?userDoc.image:"https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"} alt="userImage" />
            <div className={styles.textAreaUploadContainer}>
            <textarea className={item?.id} onChange={(e)=>setSinglePostNewComment(e.target.value)} name="newComment" id={styles.postCommentContainerExpanded} rows="3" placeholder="Share Your Thoughts" value={singlePostNewComment}></textarea>
            
            <div className={styles.addImageandUploadPostIcon}>
              <button onClick={()=>handleNewCommentonPost(item,item.id)} className={styles.uploadPostIconButton}>Comment</button>
            </div>
            </div>
          </div>
          </section>}

{/* OLD COMMENT SECTION */}
{singlePostCommentIconClick?
<section className={item?.comments.length!==0?'oldCommentSection':"oldCommentSectionNothing"}>
{item?.comments.map((list)=>{
            return (<>
            <div className='commentedByAndComment' key={list.commentid}>
            <div className='commented-by-and-edit-cont'>
            <img className='commentedUserImage' src={commentedByUserDetail?.filter((it)=>{
        return it.email===list?.commentedby?.id})[0]?.image} alt="CommentedUserPhoto" />
            <p className='commented-by'>{commentedByUserDetail?.filter((it)=>{
        return it.email===list?.commentedby?.id})[0]?.name}</p>
            {list?.commentedby?.id===user?.user?.email?
                <img onClick={()=>{setCommentThreeDotsClicked(current=>!current);setPostThreeDotsClickCommentId(list?.commentid)}} className='threeDotsPost commentThreeDotsPost' src={threeDotsIcon} alt="3dots" />
                :null}
             {CommentThreeDotsClicked&&list?.commentedby?.id===user?.user?.email&&PostThreeDotsClickCommentId===list?.commentid?
                <>
                <div className='threeDotsOptions commentThreeDotsOption'>
            <div onClick={()=>handleDeleteCommentClick(list.commentid,item,item.id)} className='threeDotsDeletePostOption'>
                Delete
            </div>
            <a style={{textDecoration:"none",color:"black",margin:"auto"}}><div onClick={()=>{;setCommentThreeDotsClicked(false);handleEditCommentClick(list.commentid,list)}} className='threeDotsEditPostOption'>
                Edit
            </div>
            </a>
        </div></>
        :null}
            </div>
                <p className='commented-by-comment'>{list.comment}</p>
            </div></>)
           }) } 
</section>:null}

</section>

    </>
  )
}

export default SharedPostCard