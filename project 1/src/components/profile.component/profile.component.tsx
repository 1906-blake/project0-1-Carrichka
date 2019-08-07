import React, { Component } from 'react';
// import User from '../../models/user';
import { Button } from 'reactstrap';

interface IState {
    profileUser: {
        id: 0,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: 0,
        roleName: ''
    },
    errorMessage?: string
    successMessage?: string
}

export default class Profile extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            profileUser: {
                id: 0,
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                email: '',
                role: 0,
                roleName: ''
            }
        };
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {

        const currentUser = localStorage.getItem('user');
        const user = currentUser && JSON.parse(currentUser);

        this.setState({
            ...this.state,
            profileUser: {
                id: user.id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role.roleId,
                roleName: user.role.role 
            }
        });

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            profileUser: {
                ...this.state.profileUser,
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
                body: JSON.stringify(this.state.profileUser),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const user = await resp.json();

            console.log(user);

            localStorage.setItem('user', JSON.stringify(user));

            this.setState({
                ...this.state,
                successMessage: `Your profile has been updated`
            })

        } catch (err) {
            console.log(err);
            console.log('Error updating');
            this.setState({
                errorMessage: 'Error updating'

            });
        }
    }

    render() {
        const users = this.state.profileUser;
        console.log(users);
        return (
            <div>

                <h1 className="h3 mb-3 font-weight-normal">My Profile</h1>
                <p className="success-message">{this.state.successMessage}</p>
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
                                    <td>{this.state.profileUser.username}</td>
                                    <td>
                                        <label htmlFor="inputFirstName" className="sr-only">First Name</label>

                                        <input type="text" id="inputFirstName"
                                            name="firstName"
                                            className="form-control"
                                            placeholder="First Name"
                                            onChange={this.handleChange}
                                            value={this.state.profileUser.firstName} required />
                                    </td>
                                    <td>
                                        <label htmlFor="inputLastName" className="sr-only">Last Name</label>

                                        <input type="text" id="inputLastName"
                                            name="lastName"
                                            className="form-control"
                                            placeholder="Last Name"
                                            onChange={this.handleChange}
                                            value={this.state.profileUser.lastName} required />
                                    </td>
                                    <td>
                                        <label htmlFor="inputEmail" className="sr-only">Email</label>

                                        <input type="text" id="inputEmail"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            onChange={this.handleChange}
                                            value={this.state.profileUser.email} required />
                                    </td>
                                    <td>{this.state.profileUser.roleName}</td>
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