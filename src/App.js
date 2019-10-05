import React from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import Blogs from './components/Blogs';
///import Blogs from "./components/Blogs";
//import allReducer from './redux/reducers';
//import { useSelector } from 'react-redux';
import { store } from "./index"

//const user = useSelector(state => state.user);

//store.dispatch()



export default function App(){
  console.log(store.getState());
  if (store.getState().author.token == null){
    return (
      <div>
        <div className="todo-app">
          <h1>Login</h1>
          <Login/>
        </div>

      </div>
    );
  }
  return (<div>
    <div>
      <Logout/>
    </div>
    <hr/>
    <div>
      <Blogs />
    </div>
  </div>)
  //else if()
}
