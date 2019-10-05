import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//import Login from './components/Login';
//import Blogs from "./components/Blogs";
import App from "./App"
//import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './redux/reducers';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import promise from "redux-promise-middleware";

const middleware = applyMiddleware(promise);
export const store = createStore(allReducers, middleware);

/*export const configureStore = () =>{
  const middlewares = []

  createStore(allReducers);

}*/

//const logger =

/*const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
      </ul>
      <Route path="/Login" component={Login} />
      <Route path="/blogs" component={Blogs} />
    </div>
  </Router>
)*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

//store.dispatch({username: "Maged95", password: "Leila",type: 'login'});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
