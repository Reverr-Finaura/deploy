import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import "./PostCard.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { getUserDocByRef } from '../../firebase'

const PostCard = ({postsData,setPostsData,item,index,handleEditPostButtonClick}) => {
    const userDoc=useSelector((state)=>state.userDoc) 
 const[isThreeDotsClicked,setIsThreeDotsClicked]=useState(false) 
 const[isCommentThreeDotsClicked,setIsCommentThreeDotsClicked]=useState(false) 
 const[newComment,setNewComment]=useState("")
 const[commentIconClick,setCommentIconClick]=useState(false)
 const [editCommentButtonIsClick,setEditCommentButtonIsClick]=useState(false)
 const [newEdittedComment,setNewEdittedComment]=useState("")
 const[editCommentId,setEditCommentId]=useState(null)
  const[threeDotsClickCommentId,setThreeDotsClickCommentId]=useState(null)
 const user=useSelector((state)=>state.user)

const[postedByUserDoc,setPostedByUserDoc]=useState({})

const[commentedByUserDoc,setCommentedByUserDoc]=useState([])
const[showMorePostTextClick,setShowMorePostTextClick]=useState(false)
const[newCommentTextAreaClick,setNewCommentTextAreaClick]=useState(false)
 




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

//HANDLE NEW COMMENT ON POST

const handleNewCommentonPost=async (item,id)=>{

const userRef=doc(db,"Users",user?.user?.email)
let newCommentArray
if(newComment===""){toast("Nothing to Comment");return}
newCommentArray=item.comments.concat([{comment:newComment,commentedby:userRef,commentid:new Date().getTime()}])
setPostsData(postsData.map((item)=>{
    if(item.id===id){return {...item,comments:newCommentArray}}
    else return item;
   }))
updateCommentInFirebase(newCommentArray,id)
setNewComment("")
setNewCommentTextAreaClick(false)


}
//UPDATE NEWCOMMENT IN FIREBASE
const updateCommentInFirebase=async (data,id)=>{
    

    const userDocumentRef=doc(db,"Posts",id)

    try {
        await updateDoc(userDocumentRef,{comments:data})
       toast("Sucessfully Commented") 
       setNewComment("")
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
setNewCommentTextAreaClick(false)
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
setNewComment("")
setEditCommentId(null)
    } catch (error) {
        console.log(error.message)
    }
}

// HANDLE DELETE POST BUTTON CLICK
const handleDeletePostButtonClick=async(itemId)=>{
toast("Processing Your Request")
setIsThreeDotsClicked(false)
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
window.location.reload()
        },500)
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


//GET USER DATA FROM REFERENCE LINK WHO HAS POSTED

useEffect(()=>{
 
    getUserDocByRef(item?.postedby).then((res)=>{
        
        setPostedByUserDoc(res)
    })  


},[item])

//GET USER DATA FROM REFERENCE LINK WHO HAS COMMENTED

useEffect(()=>{
 item.comments.map((event)=>{
    getUserDocByRef(event.commentedby).then((res)=>{
        setCommentedByUserDoc((prev)=>{
            return [...prev,res]
        })
    })  
 })

},[item])




  return (
    <>
   <section className='PostCardContainer' id={index}>
    <div className='postAuthorDetails'>
    <img style={{width:"40px",height:"40px",borderRadius:"50%",marginRight:"1rem"}} src={postedByUserDoc?.image} alt="" />
        <h3 className='postAuthorName'>{postedByUserDoc?.name}</h3>
        <div className='threeDotsContainer'>
       {user?.user?.email===item?.postedby?.id? <img onClick={()=>setIsThreeDotsClicked(current=>!current)} className='threeDotsPost' src="./images/dots.png" alt="3dots" />:null}
       {isThreeDotsClicked?
       <div className='threeDotsOptions'>
            <div onClick={()=>handleDeletePostButtonClick(item.id)} className='threeDotsDeletePostOption'>
                Delete Post
            </div>
            <a style={{textDecoration:"none",color:"black",margin:"auto"}}><div onClick={()=>{handleEditPostButtonClick(item,item.id);setIsThreeDotsClicked(false)}} className='threeDotsEditPostOption'>
                Edit Post
            </div>
            </a>
        </div>
        :null} 
        </div>
        
    </div>
    <div className='postTextContainer'>
    {item?.text.length>100?<h3 className='postText'>{showMorePostTextClick?item?.text:<>{item?.text.slice(0,100)}<span onClick={()=>setShowMorePostTextClick(true)} className='morePostTextButton'>...continue</span> </>}</h3>
    :<h3 className='postText'>{item?.text}</h3>}
        
        
    </div>
    {item?.image? <div className='postImageContainer'>
        <img className='postImage' src={item?.image} alt="postImage" />
    </div>:null}
    
    <div className='postLikesAndCommentContainer'>
        <div className='postLikesContainer'>
        <i onClick={()=>{getLikedPostIdFromFirebase(item.id,item)}} className={"fa fa-heart "+ (item?.likes.includes(user?.user?.email)?"heartPostLiked":"heartPostNotLiked")}></i>
            <h3 className='postLikeCount'>{item?.likes.length}</h3>
        </div>
        <div className='postCommentContainer'>
        <div className='commentContainer'>
        <img src='./images/postCommentIcon.png' alt='commentIcon' onClick={()=>{setCommentIconClick(current=>!current);(document.getElementsByClassName(`${item.id}`)[0]).click();(document.getElementsByClassName(`${item.id}`)[0]).focus()}} className='commentPostIcon'/>
        </div>
            <h3 className='postCommentCount'>{item?.comments.length}</h3>
        </div>
    </div>
   </section>

   {/* NEW COMMENT SECTION */}

   <section className='newCommentOnPostSection'>
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

   <section className='uploadPostContainerrrrSection'>
          <div className='newCommentContainerrrr'>
            <img className='community-newComment-cont-userImage' src={userDoc?.image?userDoc.image:"https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"} alt="userImage" />
            <div className='textAreaUploadContainer'>
            <textarea className={item?.id} onClick={()=>{setNewCommentTextAreaClick(true);setCommentIconClick(true)}} onChange={(e)=>setNewComment(e.target.value)} name="newComment" id={newCommentTextAreaClick?"postCommentContainerExpanded":"postCommentContainer"} rows="3" placeholder="Share Your Thoughts" value={newComment}></textarea>
            <img onClick={()=>setNewCommentTextAreaClick(current=>!current)} className={newCommentTextAreaClick?"expandTextAreaIconExpanded":'expandTextAreaIcon'} src="./images/addExpandTextArea.png" alt="expandTextarea" />
            {newCommentTextAreaClick?
            <div className='addImageandUploadPostIcon newCommentAddImageAndUpload'>
              <button onClick={()=>handleNewCommentonPost(item,item.id)} className='uploadPostIconButton'>Comment</button>
            </div>:null}
            </div>
          </div>
          </section>
        }

{/* OLD COMMENT SECTION */}
{commentIconClick?
<section className={item?.comments.length!==0?'oldCommentSection':"oldCommentSectionNothing"}>
{item?.comments.map((list)=>{
            return (<>
            <div className='commentedByAndComment' key={list.commentid}>
            <div className='commented-by-and-edit-cont'>
            <img className='commentedUserImage' src={commentedByUserDoc?.filter((it)=>{
        return it.email===list?.commentedby?.id})[0]?.image} alt="CommentedUserPhoto" />
            <p className='commented-by'>{commentedByUserDoc?.filter((it)=>{
        return it.email===list?.commentedby?.id})[0]?.name}</p>
            {list?.commentedby?.id===user?.user?.email?
                <img onClick={()=>{setIsCommentThreeDotsClicked(current=>!current);setThreeDotsClickCommentId(list?.commentid)}} className='threeDotsPost commentThreeDotsPost' src="./images/dots.png" alt="3dots" />
                :null}
             {isCommentThreeDotsClicked&&list?.commentedby?.id===user?.user?.email&&threeDotsClickCommentId===list?.commentid?
                <>
                <div className='threeDotsOptions commentThreeDotsOption'>
            <div onClick={()=>handleDeleteCommentClick(list.commentid,item,item.id)} className='threeDotsDeletePostOption'>
                Delete
            </div>
            <a style={{textDecoration:"none",color:"black",margin:"auto"}}><div onClick={()=>{handleEditCommentClick(list.commentid,list);setIsCommentThreeDotsClicked(false)}} className='threeDotsEditPostOption'>
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

export default PostCard