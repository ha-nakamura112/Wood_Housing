import React from 'react';
import Comment from './Comment';

export const Commentpost = ({comments, toggleDelete})=>{
  return (
    comments.map((comment) => <Comment comment={comment} key={comment.id} toggleDelete={toggleDelete}/>)

  );
};

export default Commentpost;