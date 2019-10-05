import React from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import "./App.css";

export default function blog() {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
