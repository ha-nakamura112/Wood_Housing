import HttpCommon from "../services/http-common";
import { Link } from 'react-router-dom';
import react, { useState, useEffect } from "react";
import React, { Component } from 'react';
import YourInfoSrv from "../services/yourinfo";
import comSendsrv from "../services/comSendsrv";

//FOR COMMENT SECTION
import { useRef } from "react";
import Commentpost from "./Commentpost";
import { v4 as uuidv4 } from "uuid";//This is for applying unique Id to comment
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import  {  faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import  {  faHouse } from "@fortawesome/free-solid-svg-icons";
import  {  faClock } from "@fortawesome/free-solid-svg-icons";
import  {  faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";

function Tables(props){
  const post = props.post; 
  const index = props.number;

  return(
      <aside className="show-aside">
        <figure className="show-fig">
          <img className="showimg" src={window.location.origin + `/img/post_img/${post.imgName}`}  alt={`${post.imgName}`}/>
        </figure>
        <div className="showcontent">
          <h1 className="show-h1">{post.title}</h1>
          <time className="showtime"><FontAwesomeIcon icon={  faClock }/>{post.p_date}</time>
          <p className="showp">{post.postContent}</p>
        <form className="showform">
          <button className="showbutton" type="button" onClick={()=>props.postdetail(index)}>See Detail<FontAwesomeIcon icon={  faAnglesRight }/></button>
        </form>
        </div>
      </aside>
  )
}

  function Details(props){
    const post = props.post; 
    const [postuser, setPostUser] = useState({});
 
    useEffect(()=>{
      console.log(post['user_id']);
      YourInfoSrv.loadpostuser(post['user_id'])
      // HttpCommon.post('/showuser.php',post['user_id'])
      .then(response =>{
        console.log(response.data);
        setPostUser(response.data);
        // setPostlist(response.data);
      })
      .catch(err=>{console.log(err)})
      },[]);

  return(
    <>
      <aside className="show-aside-detail">
        <figure className="show-fig-detail">
        <h1 className="show-h1-detail">{post.title}</h1>
          <img className="showimg-detail" src ={window.location.origin + `/img/post_img/${post.imgName}`} alt='img'/>
        </figure>
        <div className="showcontent-detail">
         
          <time className="showtime-detail"><FontAwesomeIcon icon={  faClock }/>{post.p_date}</time>
          <p className="showp-detail">{post.postContent}</p>
        </div>
      </aside>
      <div className="showcontent-detail-profile-wrap">
      <h3 className="postedby">Posted by</h3>
      <div className="showcontent-detail-profile-wrap2">
      <aside className="show-aside-detail-profile">
        <figure className="show-fig-detail-profile">
          <img className="showimg-detail-profile" src ={window.location.origin + `/img/profile_img/${postuser.profImg}`} alt={postuser.profImg}/>
        </figure>
       
        <div className="showcontent-detail-profile">
     
          <h3 className="showcontent-detail-profile-name">{postuser.firstName} {postuser.lastName}</h3>
          {postuser.atype === 'landlord' ? <h4 className="showcontent-detail-profile-landlord"><FontAwesomeIcon icon={  faHouse }/> Landlord</h4> : <h4 className="showcontent-detail-profile-student"><FontAwesomeIcon icon={  faGraduationCap }/> Student</h4> }
        </div>
        
      </aside>
      </div>
      </div>
    </>
  )
  }



      // COMMENT SECTION START
      function CommentSection(props) {
        const post = props.post;
        const[commentData, setCommentData] =useState('');
        const [comments, setComments] = useState([]);
        const contentRef = useRef(); 
        const handleAddComment = () => {
            const content = contentRef.current.value;
            if (content === "") return;      
            setComments((prevComments) => {
                return [...prevComments, { id: uuidv4(), content: content, delete: false, createdAt: new Date().toLocaleString() }]// to display new added comment noxt to previous comment
            });
            contentRef.current.value = null;

            const sid = sessionStorage.getItem('sid');
            const comdata = new FormData();
            comdata.append('postid',post.post_id);
            comdata.append('comment',commentData);
            comdata.append('sid',sid);
            console.log(comdata);
            comSendsrv.send(comdata)
            .then(response=>{
                console.log(response);
            })
            .catch(err=>{console.log(err)})
        };
      
        const toggleDelete = (id) => {
            const newComments = [...comments];
            const comment = newComments.find((comment) => comment.id === id);
            comment.delete = !comment.delete;
            setComments(newComments);
      
        };
      
        const handleClear = () => {
            const newComments = comments.filter((comment) => !comment.delete);
            setComments(newComments)
        };

        const ChgHandler =(event)=>{
          const content = event.target.value
          console.log(content);
          setCommentData(content);
      }
      
        return (
            <>
                < div className="CommentSectionWrap" >
                < div className="CommentWrap" >
                    <h3 className="CommentTitle">Comment</h3>
                    <textarea className="CommentTextarea" ref={contentRef} onChange={(e)=>ChgHandler(e)}/>
                    <div className="CommentBtnWrap">
                        <button className="commentBtnSend" onClick={handleAddComment}>Send</button>
                        <button className="commentBtnDelete" onClick={handleClear}><FontAwesomeIcon icon={faTrashCan} />Delete selected comment</button>
                    </div>
              
                <Commentpost comments={comments} toggleDelete={toggleDelete} />
                </div >
                </div >
            </>
        );
      
      }

      

function Showpost(props){
  const[postList,setPostlist] = useState([]);
  const [postdetail,setPostdetail] = useState({});
  const [flag, setFlag] = useState('false');
  const [inputText, setInputText] = useState("")
  useEffect(()=>{
    HttpCommon.get('/showpost.php')
    .then(response =>{
      setPostlist(response.data);
      setFlag('false');
      // console.log(response.data[0]);
    })
    .catch(err=>{console.log(err)});
    },[])
  
  const postDetail =(idx)=>{
    console.log(idx);
    setPostdetail(postList[idx]);
    console.log(postList[idx]);
    setFlag('true');
  }

  let inputHandler = (event) => {
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = postList.filter((element) => {
      if (inputText === '') {
          return element;    
      }
      else {
          return element.title.toLowerCase().includes(inputText);
      }
  });

  return(
    <>
      { flag === 'false' ? 
      <article className="show-art">
<div className="search">
                <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label={
                    <>
                  Search
                    </>
                }
                onChange={inputHandler}
                />
            </div>
            {filteredData.map((val,idx)=>{
          return(
              < Tables key={idx} post={val} number={idx}  postdetail={ postDetail } />
          )
        })} 
      </article>
        :
      <article className="show-art"> 
        <Details post = {postdetail} /> 
        <CommentSection post={postdetail}/>
      </article>
      }
    </>
  )
}

// function Showpost(){
//   const [postList,setPostlist] = useState([]);
//   const [post,setPost] = useState({});

//   const sid = sessionStorage.getItem("sid");
//   YourInfoSrv.loadInfo(sid)
//     .then(response =>{
//       // console.log(response.data);
//       setPostlist(response.data);
//     })
//     .catch(err=>{console.log(err)});

//   const postDetail =(idx)=>{
//     setPostlist(postList[idx]);
//   }
//     return (
//     <>
//       <div className="container">
//         {/* <div className="row">
//           <div className="col-md-6">
//             <div className="card">
//               <div className="card-header">
//                 Multiple Image Upload Preview
//               </div>
//               <div className="card-body">
//                 <MultipleImageUploadComponent />
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//       <article>
//         {postList.map((val,idx)=>{
//           < Tables key={idx} post={val} postdetail = {postDetail}/>
//         })}
//       </article>
//     </>
//         );
// }
export default Showpost;