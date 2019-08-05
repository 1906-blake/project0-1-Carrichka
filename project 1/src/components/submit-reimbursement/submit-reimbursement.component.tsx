import React from 'react';
import { Button, Input } from 'reactstrap';

interface IState {
    author: any,
    newReimbursement: {
        reimbursementId: number,
        author: number,
        amount: number,
        description: '',
        resolver: number,
        status: number,
        type: number
    }

    typeDropdown: {
        isOpen: boolean,
        selection: string
    }
    errorMessage?: string,
    successMessage?: string
}

export class SubmitReimbursements extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            author: [],
            newReimbursement: {
                reimbursementId: 0,
                author: 0,
                amount: 0,
                description: '',
                resolver: 1,
                status: 1,
                type: 1
            },

            typeDropdown: {
                isOpen: false,
                selection: 'Lodging'
            }
        }
        this.getAuthor();
        this.setType = this.setType.bind(this);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            ...this.state,
            newReimbursement: {
                ...this.state.newReimbursement,
                [name]: event.target.value
            }
        });
    }
    // console.log(newReimbursement);

    toggleTypeDropdown = () => {
        this.setState({
            ...this.state,
            typeDropdown: {
                ...this.state.typeDropdown,
                isOpen: !this.state.typeDropdown.isOpen
            }
        });
    }

    selectAuthor = (event: any) => {
        this.setState({
            ...this.state,
            newReimbursement: {
                ...this.state.newReimbursement,
                author: event.target.value
            }
        })
    }

    getAuthor = async () => {
        const resp = await fetch('http://localhost:8012/users', {
            credentials: 'include'
        });
        const usersFromServer = await resp.json();
        this.setState({
            ...this.state,
            author: usersFromServer
        });
    }

    setType = (event: any) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            newReimbursement: {
                ...this.state.newReimbursement,
                type: +value
            }
        });

    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        try {
            const resp = await fetch('http://localhost:8012/reimbursements', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state.newReimbursement),
                headers: {
                    'content-type': 'application/json'
                }
            });

            const reimbursement = await resp.json();
            this.setState({
                ...this.state,
                successMessage: `Reimbursement ID ${reimbursement.reimbursementId} created!`
            })

        } catch (err) {
            console.log(err);
            console.log('Reimbursement submition error');
            this.setState({
                errorMessage: 'Reimbursement submission error'

            });
        }
    }

    render() {
        const user = this.state.author;
        return (
            <form className="form-reimbursements" onSubmit={this.submit}>
                <p className="success-message">{this.state.successMessage}</p>
                <h1 className="h3 mb-3 font-weight-normal">Enter a new reimbursement request</h1>
                <p>Author
                <label htmlFor="inputAuthor" className="sr-only">Author</label>

                <Input type="select" onChange={this.selectAuthor}>
                    {
                        user.map((u: any) =>
                            <option value={u.userId} key={'userId -' + u.username}>
                                {u.firstName} {u.lastName}
                            </option>
                        )
                    }
                </Input>
                </p>
                <p>Amount
                <label htmlFor="inputAmount" className="sr-only">Amount</label>

                <input type="text" id="inputAmount"
                    name="amount"
                    className="form-control"
                    placeholder="Amount"
                    onChange={this.handleChange}
                    value={this.state.newReimbursement.amount} required />
                </p>
                <p>Description
                <label htmlFor="inputDescription" className="sr-only">Description</label>

                <input type="text" id="inputDescription"
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    onChange={this.handleChange}
                    value={this.state.newReimbursement.description} required />
                </p>
                <div>
                <p>Reimbursement Type
                    <Input type="select" onChange={this.setType}>
                        <option value='1'>
                            Lodging
                            </option>
                        <option value='2'>
                            Travel
                            </option>
                        <option value='3'>
                            Food
                            </option>
                        <option value='4'>
                            Other
                            </option>

                    </Input>
                </p>
                </div>

                {this.state.errorMessage && <p id="error-message">{this.state.errorMessage}</p>}

                <Button color="success" type="submit">Submit Request</Button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        );
    }
}