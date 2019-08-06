import React, { Component } from 'react';
import User from '../../models/user';
import { Button } from 'reactstrap';

interface IState {
    users: {
        id: 0,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 0
    },
    errorMessage?: string
}

export default class Profile extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: {
                id: 0,
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: '',
                role: 0
            }
        };
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const resp = await fetch('http://localhost:8012/users/1', {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            users: usersFromServer
        });
        console.log(usersFromServer);
        
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            users: {
                ...this.state.users,
                [name]: event.target.value
            }
        });
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        try {

            const resp = await fetch('http://localhost:8012/users', {
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(this.state.users),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const user = await resp.json();

            console.log(user);

            localStorage.setItem('user', JSON.stringify(user));

        } catch (err) {
            console.log(err);
            console.log('Error updating');
            this.setState({
                errorMessage: 'Error updating'

            });
        }
    }

    render() {
        const users = this.state.users;
        console.log(users);
        return ( 
            <div>
                
                <h1 className="h3 mb-3 font-weight-normal">My Profile</h1>
                <form className="form-profile" onSubmit={this.submit}>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr key={'usersId-' + users.id}>
                                <td>{users.username}</td>
                                <td>
                                    <label htmlFor="inputFirstName" className="sr-only">First Name</label>

                                    <input type="text" id="inputFirstName" 
                                        name="firstName"
                                        className="form-control"
                                        placeholder="First Name" 
                                        onChange={this.handleChange}
                                        value={this.state.users.firstName} required />
                                </td>
                                <td>
                                    <label htmlFor="inputLastName" className="sr-only">Last Name</label>

                                    <input type="text" id="inputLastName" 
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Last Name" 
                                        onChange={this.handleChange}
                                        value={this.state.users.lastName} required />
                                </td>
                                <td>
                                        <label htmlFor="inputEmail" className="sr-only">Email</label>

                                        <input type="text" id="inputEmail" 
                                            name="email"
                                            className="form-control"
                                            placeholder="Email" 
                                            onChange={this.handleChange}
                                            value={this.state.users.email} required />
                                </td>
                                    <td>{'Manager'}</td>
                                </tr>
                        }
                    </tbody>
                </table>
                <Button color="success" type="submit">Submit Update</Button>
                </form>
            </div>
        );
    }
}