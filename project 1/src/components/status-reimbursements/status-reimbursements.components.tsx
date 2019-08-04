import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

interface IState {
    reimbursements: Reimbursement[],
    reimbursementsDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export default class ReimbursementsByStatus extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
            reimbursementsDropdown: {
                isOpen: false,
                selection: 'Pending'
            }
        };
    }

    async componentDidMount() {
        this.getReimbursementsByStatus(1);
    }

    getReimbursementsByStatus = async (statusId:number) => {
        const resp = await fetch('http://localhost:8012/reimbursements/status/' + statusId, {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            reimbursements: reimbursementsFromServer,
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                selection: reimbursementsFromServer[0].status.status
            }
        });
        console.log(reimbursementsFromServer);
    }

    getReimbursements = async () => {
        const resp = await fetch('http://localhost:8012/reimbursements', {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            reimbursements: reimbursementsFromServer,
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                selection: 'All'
            }
        });
        console.log(reimbursementsFromServer);
    }

    toggleDropdown = () => {
        this.setState({
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                isOpen: !this.state.reimbursementsDropdown.isOpen
            }
        });
    }

    render() {
        const reimbursements = this.state.reimbursements;
        console.log(reimbursements);
        return ( 
            <div id="reimbursements-table-container">
                <h1 className="h3 mb-3 font-weight-normal">View Reimbursements By Status</h1>
                <ButtonDropdown id="reimbursements-status-dropdown"
                        isOpen={this.state.reimbursementsDropdown.isOpen} 
                        toggle={this.toggleDropdown}>

                    <DropdownToggle caret>
                        {this.state.reimbursementsDropdown.selection}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={this.getReimbursements}>All</DropdownItem>
                        <DropdownItem key={'status-dropdown-1'} 
                                        onClick={() => this.getReimbursementsByStatus(1)}>
                                        Pending 
                                        </DropdownItem>
                        <DropdownItem key={'status-dropdown-2'} 
                                        onClick={() => this.getReimbursementsByStatus(2)}>
                                        Approved 
                                        </DropdownItem>
                        <DropdownItem key={'status-dropdown-3'} 
                                        onClick={() => this.getReimbursementsByStatus(3)}>
                                        Denied 
                                        </DropdownItem>
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
                                    <td>{reimbursements.dateSubmitted}</td>
                                    <td>{reimbursements.dateResolved && reimbursements.dateResolved}</td>
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