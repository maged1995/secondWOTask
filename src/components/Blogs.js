import React from 'react';
import NewBlog from './NewBlog'
import Comments from './Comments'
import Logout from './Logout';
import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import './App.css';
import { connect } from "react-redux";
import { displayBlogs } from "../redux/actions";
import { store } from "../index"

var e;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleBChange = this.handleBChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      blog: props.blog,
      name: props.name,
      blogT: props.blogT,
      isEdit: false
    }

  }

  handleNChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleBChange(event) {
    this.setState({
      blogT: event.target.value
    });
  }

  handleEdit(event){
    this.setState({isEdit: true});
  }

  async handleSubmit(event) {
    console.log(event.target.parentNode.id);
    store.dispatch({
      type:'updateBlog',
      payload: fetch("http://localhost:3000/blogs/" + event.target.parentNode.id + "?name=" + this.state.name + "&blog=" +this.state.blogT/* + ((action.new_tag != undefined)? "&new_tag=" + action.new_tag: '')*/, {
        method: 'put',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(res => res.json())
      .then(
        responseJson => {
          console.log(responseJson);
          if(responseJson.blog==="Successful update")
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
      type: 'removeBlog',
      payload: fetch("http://localhost:3000/blogs/" + this.state.blog.id, {
        method: 'delete',
        headers: {
         'Authorization': localStorage.getItem('Authorization')
        }
      })
      .then(res => res.json())
      .then(
        responseJson => {
          if(responseJson.blog==="Removed")
            return 'removed';
        })
    });
    event.target.parentNode.parentNode.parentNode.innerHTML = '';
    //
    //console.log(store.getState().then(val => (val == 'removed')? ));
  }

  render(){
    const isEdit = this.state.isEdit;
    let elem;

    if(isEdit){
      elem = <form onSubmit={this.handleSubmit}>
        Name: <input type="text" value={this.state.name} onChange={this.handleNChange}/>
        Blog: <input type="text" value={this.state.blogT} onChange={this.handleBChange}/>
        <input type="submit" value="confirm"/>
      </form>;
    } else {
      elem = <div>
        <h3>{this.state.name} <button onClick={this.handleEdit}>Edit</button> <button onClick={this.handleDelete}>Delete</button></h3>
        <h5>{this.state.blogT}</h5>
        <Comments id={this.state.blog.id} />
      </div>
    }

    return (
      <div key={this.state.blog.id} id={this.state.blog.id}>
        {elem}
      </div>
    );

  }
}

class Blogs extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogged: (localStorage.getItem('Authorization'))? true : false,
      error: null,
      isLoaded: false,
      token: '',
      blogs: null,
      listItems: null,
      name: '',
      blog: ''
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.loadBlog = this.loadBlogs.bind(this);
    this.logoutAction = this.logoutAction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleBChange = this.handleBChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
  }

  logoutAction(event){
    this.setState({isLogged: false});
    localStorage.removeItem('Authorization');
    store.dispatch({type:'logout'});
    console.log("logout");

  }

  loadBlogs(){
    fetch("http://localhost:3000/blogs", {
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
          blogs: responseJson.blogs,
          listItems: responseJson.blogs.map((blog) =>
            <div key={blog.id}>
              <Blog key={blog.id} blog={blog} name={blog.name} blogT={blog.blog} />
              <hr/>
            </div>
          )
        })
      });
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

  async handleLoginSubmit(event) {
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
            this.setState({isLogged: true});
            this.loadBlogs();
            localStorage.setItem('Authorization', responseJson.token);
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

  async handleSubmit(event) {
    console.log(event.target.parentNode.parentNode.id);
    store.dispatch({name: this.state.name, blog: this.state.blog, id: event.target.parentNode.parentNode.id, type:'updateBlog'});
    event.preventDefault();
    //window.location.reload();
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
    if(this.state.isLogged){
      this.loadBlogs();
    }
  }

  /*getBlogs(){

  }*/

  render(){
    if(this.state.isLogged){
      return (
        <div>
          <div>
            <button onClick={this.logoutAction}>logout</button>
          </div>
          <hr/>
          <NewBlog />
          <div>
            {this.state.listItems}
          </div>
        </div>
      );
    } else {
      return(
      <form onSubmit={this.handleLoginSubmit}>
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
}

export default connect(
  null,
  { displayBlogs }
)(Blogs);
