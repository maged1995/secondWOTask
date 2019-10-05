import React from "react";

const initialState = {
  blogs: null
}

var r;

const blogsReducer = async (state = initialState, action) => {

  switch (action.type) {
    case 'createBlog': {
      return action.payload;
    }
    break;
    case 'removeBlog': //{
      //return 'action';
      return action.payload;
    //}
    break;
    case 'updateBlog': //{
      return action.playload;
    //}
    break;
    default: {
      return state;
    }
  }
}

export default blogsReducer;
