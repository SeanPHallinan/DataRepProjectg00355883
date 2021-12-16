import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// some comments
class Useritem extends Component {
    constructor() {
        super();
        this.DeleteUser = this.DeleteUser.bind(this);
    }

    DeleteUser() {
        console.log('Delete: ' + this.props.user._id);

        axios.delete('http://localhost:4000/api/users/' + this.props.user._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch();

    }

    render() {
        return (
            <div style={{height: '25%', backgroundColor: 'lightgray' }}>
                {/* some comments  */}
                <Card>
                    <Card.Header>{this.props.user.Website}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <p>{this.props.user.Password}</p>
                            <footer>
                                {this.props.user.Username}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.user._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteUser}>Delete</Button>
                </Card>
            </div>
        );
    }
}
export default Useritem;