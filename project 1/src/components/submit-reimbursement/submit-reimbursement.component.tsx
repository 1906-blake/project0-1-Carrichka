import React from 'react';
import { Button } from 'reactstrap';
import Reimbursement from '../../models/reimbursement';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

interface IState {
    newReimbursement: {
        reimbursementId:number,
        author:number,
        amount:number,
        description: '',
        resolver:number,
        status:number,
        type:number
    }

    // types: {
    //     name: string,
    //     typeId: number
    // }

    typeDropdown: {
        isOpen: boolean,
        selection: string
    }
    errorMessage?: string
}

export class SubmitReimbursements extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            newReimbursement: {
                reimbursementId: 0,
                author: 0,
                amount: 0,
                description: '',
                resolver: 1,
                status: 1,
                type: 0
            },

            // types: {
            //     Lodging: 1,
            //     Travel: 2,
            //     Food: 3,
            //     Other:4
            // }, 

            typeDropdown: {
                isOpen: false,
                selection: 'Travel'
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        this.setState({
            newReimbursement: {
                ...this.state.newReimbursement,
                [name]: event.target.value
            }
        });
    }

    toggleTypeDropdown = () => {
        this.setState({
            typeDropdown: {
                ...this.state.typeDropdown,
                isOpen: !this.state.typeDropdown.isOpen
            }
        });
    }

    // setType = (typeId:number) => {

        
    //     this.setState({
            
    //         typeDropdown: {
    //             ...this.state.typeDropdown,
    //             selection: types
    //         }
    //     });
    //     // console.log(newReimbursement);
    // }

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

            const user = await resp.json();

            console.log(user);

            localStorage.setItem('user', JSON.stringify(user));

        } catch (err) {
            console.log(err);
            console.log('Reimbursement submition error');
            this.setState({
                errorMessage: 'Reimbursement submition error'

            });
        }
    }

    render() {
        return (
            <form className="form-reimbursements" onSubmit={this.submit}>

                <h1 className="h3 mb-3 font-weight-normal">Enter a new reimbursement request</h1>

                <label htmlFor="inputAuthor" className="sr-only">Author</label>

                <input type="text" id="inputAuthor" 
                    name="author"
                    className="form-control"
                    placeholder="Author" 
                    onChange={this.handleChange}
                    value={this.state.newReimbursement.author} required />

                <label htmlFor="inputAmount" className="sr-only">Amount</label>

                <input type="text" id="inputAmount" 
                    name="amount"
                    className="form-control"
                    placeholder="Amount" 
                    onChange={this.handleChange}
                    value={this.state.newReimbursement.amount} required />

                <label htmlFor="inputDescription" className="sr-only">Description</label>

                <input type="text" id="inputDescription" 
                    name="description"
                    className="form-control" 
                    placeholder="Description"
                    onChange={this.handleChange}
                    value={this.state.newReimbursement.description} required />

            {/* <div>
                <ButtonDropdown id="reimbursements-type-dropdown"
                        isOpen={this.state.typeDropdown.isOpen} 
                        toggle={this.toggleTypeDropdown}>

                    <DropdownToggle caret>
                        {this.state.typeDropdown.selection}
                    </DropdownToggle>
                <DropdownMenu>
                        <DropdownItem key={'type-dropdown-1'} 
                            onClick={(e) => this.state.newReimbursement.type.typeId =1 })}>
                            Lodging 
                            </DropdownItem>
                        <DropdownItem key={'type-dropdown-2'} 
                            onClick={() => this.setType(2)}>
                            Travel 
                            </DropdownItem>
                        <DropdownItem key={'type-dropdown-3'} 
                             onClick={() => this.setType(3)}>
                            Food 
                            </DropdownItem>
                        <DropdownItem key={'type-dropdown-4'} 
                            onClick={() => this.state.newReimbursement.type.typeId=4)}>
                            Other 
                            </DropdownItem>               
                    </DropdownMenu>
                </ButtonDropdown>
                </div> */}
                <label htmlFor="inputType" className="sr-only">Type</label>

                <input type="text" id="inputType" 
                    name="type"
                    className="form-control"
                    placeholder="Type" 
                    onChange={this.handleChange}
                    value={this.state.newReimbursement.type} required />

                {this.state.errorMessage && <p id="error-message">{this.state.errorMessage}</p>}

                <Button color="success"  type="submit">Submit Request</Button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        );
    }
}