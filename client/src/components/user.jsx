import React from 'react';

export default class User extends React.Component{
  render(){
    return(
      <li>
        {this.props.name} - {this.props.email}
      </li>
    )
  }

}
