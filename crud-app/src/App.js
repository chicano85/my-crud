import React, { Component } from "react";
import UserList from "./components/UserList";

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1 className="title">MY CRUD WITH REACT</h1>
        </header>
        <UserList />
      </div>
    );
  }
}

export default App;
