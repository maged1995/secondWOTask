import React from 'react';
//import NewBlog from './NewBlog'
//import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux";
import { displayBlogs } from "../redux/actions";

import { connect } from "react-redux";
import { displayBlogs } from "../redux/actions";
import { store } from "../index"

class Comment extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      comment: '',
      isEdit: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  handleEdit(event){
    this.setState({isEdit: true});
  }

  async handleSubmit(event) {
    console.log(event.target.parentNode.id);
    store.dispatch({
      type:'updateComment',
      payload: fetch("http://localhost:3000/comments/" + this.state.comment.id + "?comment=" + this.state.comment/* + ((action.new_tag != undefined)? "&new_tag=" + action.new_tag: '')*/, {
        method: 'put',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(res => res.json())
      .then(
        responseJson => {
          console.log(responseJson);
          if(responseJson.comment==="Successful update")
            return "Success";
          })
    });
    event.preventDefault();

    this.setState({isEdit: false});
    //window.location.reload();
  }

  handleDelete(event){
    //const { parent, child } = this.props.node();
    e = event.target;
    //console.log(parent);
    store.dispatch({
      type: 'removeComment',
      payload: fetch("http://localhost:3000/comments/" + this.state.comment.id, {
        method: 'delete',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(res => res.json())
      .then(
        responseJson => {
          if(responseJson.comment==="Removed")
            return 'removed';
          else return 'not removed';
        })
    });
    event.target.parentNode.parentNode.parentNode.innerHTML = '';
    //
    //console.log(store.getState().then(val => (val == 'removed')? ));
  }

}

class Comments extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      blogID: props.id,
      error: null,
      isLoaded: false,
      token: '',
      comments: null,
      listItems: null
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(event){
    //dispatch();
  }

  handleDelete(event){
    //dispatch();
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

  componentDidMount() {
    fetch("http://localhost:3000/comments/" + this.state.blogID, {
      method: 'GET',
      headers: {
       'Authorization': localStorage.getItem('Authorization')
      }
      //'Content-Type': 'application/json',
    })
    .then(res => res.json())
    .then(
      responseJson => {
        this.setState({
          listItems: responseJson.comments.map((comment) =>
            <Comment item={comment} />
          )
        })
      });

  }
}

export default connect(
  null
)(Blogs);
