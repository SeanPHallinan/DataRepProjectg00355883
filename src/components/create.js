import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            Website: '',
            Username: '',
            Password: ''
        }
    }

    handleSubmit(event) {
        console.log("Website: " +this.state.Website+
        " Username: " + this.state.Username +
        "Password: " + this.state.Password);

        const NewUser = {
            Website: this.state.Website,
            Username: this.state.Username,
            Password: this.state.Password
        }

        axios.post('http://localhost:4000/api/users', NewUser)
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err);
        })

        event.preventDefault();
        this.setState({
            Website:'',
            Username:'',
            Password:''
        });
    }
    onChangeWebsite(event) {
        this.setState({
            Website: event.target.value
        })
    }
    onChangeUsername(event) {
        this.setState({
            Username: event.target.value
        })
    }
    onChangePassword(event){
        this.setState({
            Password: event.target.value
        })
    }

    render() {
        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <h1>This is the Create Component!</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Website of account: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Website}
                            onChange={this.onChangeWebsite}
                        />
                    </div>
                    <div className="form-group">
                        <label>Account Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Add User"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Create;