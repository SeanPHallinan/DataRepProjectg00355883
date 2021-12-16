import React, { Component } from 'react';
import axios from 'axios';


class Edit extends Component {
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

    componentDidMount(){
        axios.get('http://localhost:4000/api/users/'+ this.props.match.params.id)
        .then((response)=>{
            this.setState({
                Website:response.data.Website,
                Username:response.data.Username,
                Password:response.data.Password,
                _id:response.data._id
            })
        })
        .catch();
    }

    handleSubmit(event) {
        console.log("Name: " +this.state.Website+
        " Username: " + this.state.Username +
        "Password: " + this.state.Password);

        const NewUser = {
            Website: this.state.Website,
            Username: this.state.Username,
            Password: this.state.Password
        }

        axios.put('http://localhost:4000/api/users/' + this.state._id, NewUser)
        .then((response)=>{console.log(response)})
        .catch();
        

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
            <div>
                <h1>This is my Edit Component!</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Edit Website Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Website}
                            onChange={this.onChangeWebsite}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Password: </label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Edit User"
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}
export default Edit;