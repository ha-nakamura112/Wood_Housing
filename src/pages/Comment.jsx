import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {  faClock } from "@fortawesome/free-solid-svg-icons";



export const Comment = ({ comment, toggleDelete }) => {
  const handleDeleteClick = () => {
    toggleDelete(comment.id);
  }

  return (
    <>
      <div className='commentSection'>
        <label>
          <input className="deleteCheckbox" type="checkbox" checked={comment.delete} readOnly
            onChange={handleDeleteClick} />
        </label>
        <div className='commentContentWrap'>
          <div className='commentDateWrap'>
            <div className='commentDate'>
            <FontAwesomeIcon icon={  faClock }/>
              {comment.createdAt}
            </div>
          </div>
          <div className="postedComment">
            {comment.content}
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment;
