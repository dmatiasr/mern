import React from 'react';
import ReactDom from 'react-dom';
import { Button, Container, Form,
  FormGroup, Label,
  Input, FormText, Col } from 'reactstrap';

export default class nameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email:''
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
      //  name: event.target.value
      });
    }
    if(target.id==="email"){
      this.setState({
        [event.target.id]:target.value
      });
    }
    console.log(this.state.name+" - "+this.state.email);
  }

  handleSubmit(event) {
    console.log('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <label>
          Name:
          <input type="text" id="name" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Email:
            <input type="text" id="email" value={this.state.username} onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}
