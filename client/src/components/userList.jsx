import React from 'react';
import User from './user.jsx';

export default class UserList extends React.Component{
  render(){
    return(
      <ul>
          {this.props.users.map( u=> {
          return(
            <User
                key={u.id}
                name={u.name}
                email={u.email}
            />
          )
          })
          }
      </ul>

    )
  }

}
