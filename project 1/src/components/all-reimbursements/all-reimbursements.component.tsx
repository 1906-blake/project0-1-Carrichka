import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';

interface IState {
    reimbursements: Reimbursement[],
}

export default class Reimbursements extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
        };
    }

    async componentDidMount() {
        this.getReimbursements();
    }

    getReimbursements = async () => {

        const currentUser = localStorage.getItem('user');
        const user = currentUser && JSON.parse(currentUser);
        const userId = user.id;

        const resp = await fetch('http://localhost:8012/reimbursements/author/userId/' + userId,{
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            reimbursements: reimbursementsFromServer,

        });
        console.log(reimbursementsFromServer);
    }

    render() {
        const reimbursements = this.state.reimbursements;
        console.log(reimbursements);
        return ( 
            <div>
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
                                    <td>{reimbursements.amount}</td>
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
        );
    }
}