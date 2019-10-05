//import React from "react";
//import { connect, useSelector } from "react-redux";

const initialState = {
  token: (localStorage.getItem('Authorization') != 'undefined')? localStorage.getItem('Authorization') : null,
  id: null
}

var log = null;

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'register': {
      //return 'action';
      return(action.payload);
    }
    //break;
    case 'login_FULFILLED': {
      console.log(action.payload);
      return action.payload;
        localStorage.setItem('Authorization', action.payload.token);
        //alert(localStorage.getItem('Authorization'));
        setTimeout(function(){window.location.reload()},1000);
        //return {token :localStorage.getItem('Authorization')};
    }
    break;//localStorage.getItem('Authorization'
    case 'logout': {
      console.log(state);
      /*fetch("http://localhost:3000/logout", {
        method: 'delete',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(res => res.json())logoutAction(event){
    store.dispatch({type:'logout'});
    console.log("logout");
  }
      .then(
        responseJson => {
          //localStorage.setItem('Authorization', responseJson.token);
          if(responseJson.Logout == "Success"){
            //console.log(responseJson.Logout);
            setTimeout(function(){window.location.reload()},1000);
            console.log(state);
            localStorage.removeItem('Authorization');
            return null;
          }
        });
*/
      localStorage.removeItem('Authorization');
      return {token: null, };
    }
    break;
    default:
      return state;

  }
}

export default authorReducer;
