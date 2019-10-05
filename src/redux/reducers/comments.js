import React from "react";

const initialState = {
  comment: null
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'createComment': //{
      //return 'action';
    //}
    break;
    case 'editComment': //{
      //return 'action';
    //}
    break;
    case 'removeComment': //{
      //return 'action';
    //}
    break;
    case 'showComments':
      fetch("http://localhost:3000/comments/", {
        method: 'GET',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
        //'Content-Type': 'application/json',
      })
      .then(res => res.json())
      .then(
        responseJson => {
          
        });
    break;
    default: {
      //Error return state;
    }
  }
}

export default commentsReducer;
