import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const url = "https://reqres.in/api/users?page=2";

class UserList extends Component {
  state = {
    data: [],
    modalCreate: false,
    modalDelete: false,
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

  CreateUser = async () => {
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

  update = () => {
    fetch.put(url + this.state.form.id, this.state.form).then((response) => {
      this.modalCreate();
      this.getUsers();
    });
  };

  peticionDelete = () => {
    fetch.delete(url + this.state.form.id).then((response) => {
      this.setState({ modalDelete: false });
      this.getUsers();
    });
  };

  selectUser = (user) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { form } = this.state;
    return <div></div>;
  }
}

export default UserList;
