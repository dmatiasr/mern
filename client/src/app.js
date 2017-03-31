
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container } from 'reactstrap';

import ReactDom from 'react-dom';
import UserForm from './components/userForm.jsx';
import UserList from './components/userList.jsx';

export default class App extends React.Component{
  constructor(){
   super();

  }

  render(){
    return(
      <Container>
        <UserForm/>
      </Container>
    )
  }
}
ReactDom.render(<App/>, document.getElementById('app') );
