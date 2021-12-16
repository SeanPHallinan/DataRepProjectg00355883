import React, { Component } from 'react';
import Users from './users';
import axios from 'axios';

class Read extends Component
{
    constructor(){
        super();
        this.ReloadData = this.ReloadData.bind(this);
    }

    ReloadData(){
        axios.get('http://localhost:4000/api/users')
        .then((response)=>{
            this.setState({myusers: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/users')
        .then((response)=>{
            this.setState({myusers: response.data})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    state = {
        myusers: []            
    };

    render(){
        return(
            <div>
                <h1>This is my Read component!</h1>
                <Users clients={this.state.myusers} ReloadData={this.ReloadData}></Users>
            </div>
        );
    }
}
export default Read;