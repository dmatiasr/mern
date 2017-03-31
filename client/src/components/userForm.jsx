import React from 'react';
import ReactDom from 'react-dom';
import { Button, Container, Form,
  FormGroup, Label,
  Input, FormText, Col } from 'reactstrap';

import UserList from './userList.jsx';
import NameForm from './nameForm.jsx'
export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username:'',
      email:'',
      password:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    const target= event.target;

    if(target.id==="name"){
      this.setState({
        [event.target.id]:target.value
      });
    }
    if(target.id==="username"){
      this.setState({
        [event.target.id]:target.value
      });
    }

    if(target.id==="email"){
      this.setState({
        [event.target.id]:target.value
      });
    }
    if(target.id==="password"){
      this.setState({
        [event.target.id]:target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var user= this.state;
    console.log(user);
    fetch('http://localhost:3000/register' ,{
      method:'post',
      body: JSON.stringify(user),
      headers: new Headers({
       'Content-Type': 'application/json',
        Accept: 'application/json,'
      })
    }).then(function (res) {
        if(res.status==200){
          console.log("Agregado");
        }
        else{
          console.log("No agregado algo paso");
        }
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          Nombre:
        </Label>
        <Input type="text" id="name" value={this.state.name} onChange={this.handleChange} />
        <Label>
          Nombre de Usuario:
        </Label>
        <Input type="text" id="username" value={this.state.username} onChange={this.handleChange} />
        <Label>
          Email:
        </Label>
        <Input type="text" id="email" value={this.state.email} onChange={this.handleChange} />
        <Label>
          Contraseña:
        </Label>
        <Input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
        <Button color="primary" type="submit"> Agregar </Button>
      </Form>
    );
  }
}
