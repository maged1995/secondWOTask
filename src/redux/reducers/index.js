import blogsReducer from "./blogs";
import authorReducer from "./author";
import commentsReducer from "./comments";
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  blogsReducer: blogsReducer,
  author: authorReducer
  //commentsReducer: commentsReducer
});

export default allReducers;
