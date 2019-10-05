import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Blogs from './Blogs';
import { connect } from "react-redux";
import { store } from "../index"

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    }
  }

  render(){
    const isLogged = Login.getState().username;
    let elem;

    if(!isLogged){
      elem = <div className="todo-app">
        <h1>Login</h1>
        <Login/>
      </div>
    } else {
      elem = <div> <div>
        <Logout/>
      </div>
      <hr/>
      <div>
        <Blogs />
      </div></div>
    }

    return(
      <div>
        {elem}
      </div>
    )
  }
}

export default connect(
  null
)(Main);
