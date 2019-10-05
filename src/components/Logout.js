import React from 'react';
import { store } from "../index"
//import './App.css';

export default class Logout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      isLoaded: false,
      token: ''
    };

    this.logoutAction = this.logoutAction.bind(this);
  }


  logoutAction(event){
    store.dispatch({type:'logout'});
    console.log("logout");
  }

  render(){
    return(
      <button onClick={this.logoutAction}>logout</button>
    );
  }

}
