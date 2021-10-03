import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
    axios
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
    await axios
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
    axios.put(url + this.state.form.id, this.state.form).then((response) => {
      this.modalCreate();
      this.getUsers();
    });
  };

  deleteUser = () => {
    axios.delete(url + this.state.form.id).then((response) => {
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
    return (
      <div>
        <button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: null, tipoModal: "Añadir" });
            this.modalCreate();
          }}
        >
          Añadir Usuario
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.selectUser(user);
                        this.modalCreate();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.selectUser(user);
                        this.setState({ modalDelete: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalCreate}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "right" }} onClick={() => this.modalCreate()}>
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input
                className="form-control"
                type="text"
                name="id"
                id="id"
                readOnly
                onChange={this.handleChange}
                value={form ? form.id : this.state.data.length + 1}
              />
              <br />
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form ? form.name : ""}
              />
              <br />
              <label htmlFor="nombre">Apellido</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                id="lastName"
                onChange={this.handleChange}
                value={form ? form.lastName : ""}
              />
              <br />
              <label htmlFor="email">email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                onChange={this.handleChange}
                value={form ? form.email : ""}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === "Añadir" ? (
              <button
                className="btn btn-success"
                onClick={() => this.CreateUser()}
              >
                Añadir
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => this.update()}>
                Actualizar
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() => this.modalCreate()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
            ¿Estás seguro que deseas eliminar este usuario? {form && form.name}
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteUser()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalDelete: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UserList;
