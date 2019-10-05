import React from 'react';
//import PropTypes from 'prop-types'
//import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux";
import { login } from "../redux/actions";
import { store } from "../index"

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      isLoaded: false,
      token: ''
    };

    this.handleUChangestate = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  async handleSubmit(event) {
    /*fetch("http://localhost:3000/login?username="+ this.state.username +"&password="+this.state.password, {
      method: 'post'
    })
      .then(res => res.json())
      .then(
        responseJson => {
          this.setState({
            token: responseJson.token
          });
          localStorage.setItem('Authorization', responseJson.token);
          alert('A name was submitted: ' + responseJson.token);
        });*/
    store.dispatch({
      type: 'login',
      payload: fetch("http://localhost:3000/login?username="+ this.state.username +"&password="+ this.state.password, {
        method: 'post'
      })
      .then(res => res.json())
      .then(
        responseJson => {
          localStorage.setItem('Authorization', responseJson.token);
          //alert('A name was submitted: ' + responseJson);
          console.log(responseJson.login);
          if (responseJson.login == 'success'){
            return ({token: responseJson.token, username: responseJson.username});
          }
          else {
            return ({login: "failure"});
          }
        })
    });
    console.log(store.getState());
    //login(this.state.username, this.state.password);
    //setTimeout(function(){console.log(store.getState())},2000);
    event.preventDefault();
    //window.location.reload();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.username} onChange={this.handleUChange} />
        </label>
        <label>
          password:
          <input type="password" value={this.state.password} onChange={this.handlePChange} />
        </label>
        <input type="submit" value="Submit" />

      </form>
    );
  }
}

/*Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    log: state.token
  };
};
*/

export default connect(
  null,
  { login }
)(Login);
