import React, { Component } from 'react';
import Reimbursement from '../../models/reimbursement';
import { Button, Input } from 'reactstrap';

interface IState {
    reimbursements: Reimbursement[],
    processedReimbursements: {
        reimbursementId:number,
        statusId:number
    },
    reimbursementsDropdown: {
        isOpen: boolean,
        selection: string
    }
}

export default class ProcessReimbursements extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
            processedReimbursements: {
                reimbursementId: 0,
                statusId:1
            },
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

    toggleDropdown = () => {
        this.setState({
            reimbursementsDropdown: {
                ...this.state.reimbursementsDropdown,
                isOpen: !this.state.reimbursementsDropdown.isOpen
            }
        });
    }

    setType = (event: any) => {
        const value = event.target.value;
        this.setState({
            // ...this.state,
            // reimbursementsDropdown: {
            //     ...this.state.processedReimbursements,
            //     type: +value
            // }
        });

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            // newReimbursement: {
            //     ...this.state.newReimbursement,
            //     [name]: event.target.value
            // }
        });
    }

    render() {
        const reimbursements = this.state.reimbursements;
        console.log(reimbursements);
        return ( 
            <div id="reimbursements-table-container">
                <h1 className="h3 mb-3 font-weight-normal">Process Reimbursements</h1>
                <div>
                <p>Please use the radio buttons to select a reimbursement then choose your selection below
                    <Input type="select" onChange={this.setType}>
                        <option value='2'>
                            Approved
                            </option>
                        <option value='3'>
                            Denied
                            </option>

                    </Input>
                </p>
                </div>
                <div>
                <Button color="success" type="submit">Submit Request</Button>
                </div>
                <table className="table table-striped table-dark">
                    <thead>
                    <tr>
                            <th scope="col">ID</th>
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
                                    <td><label>
                                        <input type="radio" name={"react-tips" + reimbursements.reimbursementId}
                                                value="option1" checked={true} className="form-check-input"/>
                                    </label>
                                    {reimbursements.reimbursementId}</td>
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