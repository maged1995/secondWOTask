import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { displayBlogs } from "../redux/actions";
import { connect } from "react-redux";
import { store } from "../index"
//import Blogs from "./Blogs"


class NewBlog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      blog: '',
      error: null,
      isLoaded: false,
      token: '',
      blogs: null,
      listItems: null
    };

    this.handleNChange = this.handleNChange.bind(this);
    this.handleBChange = this.handleBChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleBChange(event) {
    this.setState({
      blog: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    store.dispatch({
      type:'createBlog',
      payload: fetch("http://localhost:3000/blogs?name=" + this.state.name + "&blog=" + this.state.blog, {
        method: 'post',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(res => res.json())
      .then(
        responseJson => {
          if(responseJson.blog=="Created")
            return 'Created';
          else{
            return 'not Created';
          }
          //setTimeout(function(){},2000);
        })
    });
    console.log(store.getState());
  }

  /*getBlogs(){

  }*/

  render(){parentNode
    return (
      <div>
      <h2>New Blog?</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleNChange} />
          </label>
          <label>
            Blog:
            <input type="text" value={this.state.blog} onChange={this.handleBChange} />
          </label>
          <input type="submit" value="Submit" />

        </form>
        <hr/>
      </div>


    );
  }
}

export default connect(
  null,
  { displayBlogs }
)(NewBlog);
