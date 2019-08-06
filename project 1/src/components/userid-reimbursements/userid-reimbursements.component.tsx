import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import User from '../../models/user';

interface IState {
    reimbursements: Reimbursement[],
    users: User[],
    usersDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export default class ReimbursementsById extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            reimbursements: [],
            usersDropdown: {
                isOpen: false,
                selection: 'Choose The User'
            }
        };
        this.getUsers();
    }

    async componentDidMount() {
    }

    getUsersById = async (users: User) => {
        const resp = await fetch('http://localhost:8012/users/' + users.id, {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            users: usersFromServer,
            usersDropdown: {
                ...this.state.usersDropdown,
                selection: users.firstName
            }
        });
        console.log(usersFromServer);
    }

    getUsers = async () => {
        const resp = await fetch('http://localhost:8012/users', {
            credentials: 'include'
        });
        const allUsersFromServer = await resp.json();
        this.setState({
            users: allUsersFromServer
        });
        console.log(allUsersFromServer);
    }

    getReimbursementsById = async (userId: number) => {
        const resp = await fetch('http://localhost:8012/reimbursements/author/userId/' + userId, {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            reimbursements: reimbursementsFromServer,
            usersDropdown: {
                ...this.state.usersDropdown,
                selection: reimbursementsFromServer[0].author.firstName + ' ' +reimbursementsFromServer[0].author.lastName
            }
        });

        console.log(reimbursementsFromServer);
    }

    getReimbursements = async () => {
        const resp = await fetch('http://localhost:8012/reimbursements/author/userId/2', {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            reimbursements: reimbursementsFromServer,
            usersDropdown: {
                ...this.state.usersDropdown,
                selection: 'All'
            }
        });
        console.log(reimbursementsFromServer);
    }

    toggleGameDropdown = () => {
        this.setState({
            usersDropdown: {
                ...this.state.usersDropdown,
                isOpen: !this.state.usersDropdown.isOpen
            }
        });
    }

    render() {
        const reimbursements = this.state.reimbursements;
        console.log(reimbursements);
        return (
            <div id="reimbursements-table-container">
                <h1 className="h3 mb-3 font-weight-normal">View Reimbursements by Employee</h1>
                <ButtonDropdown id="reimbursements-status-dropdown"
                    isOpen={this.state.usersDropdown.isOpen}
                    toggle={this.toggleGameDropdown}>

                    <DropdownToggle caret>
                        {this.state.usersDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        {/* <DropdownItem key={'status-dropdown-1'} 
                                        onClick={() => this.getReimbursementsById(1)}>
                                        1 
                                        </DropdownItem>
                        <DropdownItem key={'status-dropdown-2'} 
                                        onClick={() => this.getReimbursementsById(2)}>
                                        2 
                                        </DropdownItem>
                        <DropdownItem key={'status-dropdown-3'} 
                                        onClick={() => this.getReimbursementsById(3)}>
                                        3 
                                        </DropdownItem> */}
                        {
                            this.state.users.map(user =>
                                <DropdownItem key={'users-dropdown-' + user.id}
                                    onClick={() => this.getReimbursementsById(user.id)}>
                                    {user.firstName} {user.lastName}
                                </DropdownItem>
                            )
                        }
                    </DropdownMenu>
                </ButtonDropdown>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Author</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date Submitted</th>
                            <th scope="col">Date Resolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Resolver</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimbursements.map(reimbursements =>
                                <tr key={'reimbursementId-' + reimbursements.reimbursementId}>
                                    <td>{reimbursements.author.firstName + ' ' + reimbursements.author.lastName}</td>
                                    <td>${reimbursements.amount}</td>
                                    <td>{new Date(reimbursements.dateSubmitted).toDateString()}</td>
                                    <td>{reimbursements.dateResolved && new Date(reimbursements.dateResolved).toDateString()}</td>
                                    <td>{reimbursements.description}</td>
                                    <td>{reimbursements.resolver.firstName + ' ' + reimbursements.resolver.lastName}</td>
                                    <td>{reimbursements.status.status}</td>
                                    <td>{reimbursements.type.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}