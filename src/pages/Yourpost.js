import HttpCommon from "../services/http-common";
import { useEffect, useState} from "react";
import YourInfoSrv from "../services/yourinfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {  faClock } from "@fortawesome/free-solid-svg-icons";

function Tables(props){
  const post = props.post; 
  return(
      <aside className="show-aside">
        <figure className="show-fig">
          <img className="showimg" src ={window.location.origin + `/img/post_img/${post.imgName}`} alt={post.imgName}/>
          {/* <img src ='../img/post_img/'{post.imgName}''/> */}
        </figure>
        <div className="showcontent">
          <h1 className="show-h1">{post.title}</h1>
          <time className="showtime"><FontAwesomeIcon icon={  faClock }/>{post.p_date}</time>
          <p className="showp">{post.postContent}</p>
        {/* <form className="showform">
          <button className="showbutton" type="submit" onClick={()=>props.postdetail(index)}> See Detail</button>
        </form> */}
        </div>
      </aside>

  )
}

function Yourpost(props){
  const[postList,setPostlist] = useState([]);
  useEffect(()=>{
    let sid = sessionStorage.getItem("sid");
  YourInfoSrv.loadInfo(sid)
    .then(response =>{
      // console.log(response.data);
      setPostlist(response.data);
      // console.log(postList);
    })
    .catch(err=>{console.log(err)});
  },[]);

  return(
    <>
    {postList === null? <article className="show-art"><h1>You haven't posted yet</h1></article> : 
      <article className="show-art">
        {postList.map((val,idx)=>{
          return(
              < Tables key={idx} post={val} />
          )
        })}
      </article>}
    </>
  )
}

export default Yourpost;