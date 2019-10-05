import promiseMiddleware from 'redux-promise';
import { store } from "../../index"

//Blog


export const displayBlogs = () => {
  return {
    type: 'displayBlogs'
  }
}

export const createBlog = () => {
  return {
    type: 'createBlog'
  }
}

export const removeBlog = () => {
  return {
    type: 'removeBlog'
  }
}

export const updateBlog = () => {
  return {
    type: 'updateBlog'
  }
}

//Author
export const login = action => {
  return {
    type: 'login',
    action
  }
}

export const register = content => {
  return {
    type: 'register',
    content
  }
}

export const logout = () => {
  return {
    type: 'logout'
  }
}

//Comment
export const createComment = () => {
  return {
    type: 'createComment'
  }
}

export const editComment = () => {
  return {
    type: 'editComment'
  }
}
