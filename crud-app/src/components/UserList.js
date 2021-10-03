import React, { Component } from "react";

const url = "https://reqres.in/api/users?page=2";

class UserList extends Component {
  state = {
    data: [],
    modalCreate: false,
    modalEliminar: false,
    form: {
      id: "",
      name: "",
      lastName: "",
      email: "",
    },
  };

  getUsers = () => {
    fetch
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    delete this.state.form.id;
    await fetch
      .post(url, this.state.form)
      .then((response) => {
        this.modalCreate();
        this.getUsers();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export default UserList;
