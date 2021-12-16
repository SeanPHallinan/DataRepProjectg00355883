import React, { Component } from 'react';
import Useritem from './useritem';

class Users extends Component
{
    render(){
        return this.props.clients.map((client)=>{
            return <Useritem user={client} key={client._id} ReloadData={this.props.ReloadData}></Useritem>
        })
    }
}
export default Users;