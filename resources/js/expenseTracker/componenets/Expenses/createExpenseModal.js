import React, { Component } from "react";
import {Modal, Button, FormGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {capitalizeFLetter} from "../../functions";

class CreateExpenseModal extends Component {
    constructor(props) {
        super(props);

        this.state={
            name: '',
            amount: '',
            price: '',
            category: '',
            nameError: false,
            amountError: false,
            priceError: false,
            categoryError: false,
            categories: []
        }
    }

    componentDidMount() {
        axios.get('/api/categories').then(response=>{
            this.setState({
                categories: response.data.categories
            });
        }).catch(error=>{
        });
    }

    addExpense = ()=>{
        axios.post('/api/expenses/create',{
            name: this.state.name,
            amount: this.state.amount,
            price: this.state.price,
            category: this.state.category
        }).then(response=>{
            this.setState({
                name: '',
                amount: '',
                price: '',
                category: '',
                nameError: false,
                amountError: false,
                priceError: false,
                categoryError: false
            })
            this.props.onSave(response.data.expense, true);
        }).catch(error=>{
            try {
                if (error.response && error.response.status === 422) {
                    if (error.response.data.errors.name)
                        this.setState({
                            nameError: true
                        });
                    else
                        this.setState({
                            nameError: false
                        });
                    if (error.response.data.errors.amount)
                        this.setState({
                            amountError: true
                        });
                    else
                        this.setState({
                            amountError: false
                        });
                    if (error.response.data.errors.category)
                        this.setState({
                            categoryError: true
                        });
                    else
                        this.setState({
                            categoryError: false
                        });
                    if (error.response.data.errors.price)
                        this.setState({
                            priceError: true
                        });
                    else
                        this.setState({
                            priceError: false
                        });
                }else{
                    this.props.onSave(null, false);
                }
            }catch (e) {

            }
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => {
                    this.setState({
                        name: '',
                        amount: '',
                        price: '',
                        category: '',
                        nameError: false,
                        amountError: false,
                        priceError: false,
                        categoryError: false
                    })
                    this.props.onHide()
                }}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <Form.Label>
                                Expense Name:
                            </Form.Label>
                            <Form.Control
                                isInvalid={this.state.nameError}
                                type="text"
                                value={this.state.name}
                                onChange={e=>this.setState({name: e.target.value})}
                            />
                            {
                                this.state.nameError ?
                                    <Form.Control.Feedback type="invalid">
                                        Please choose an expense Name.
                                    </Form.Control.Feedback>
                                    :
                                    ''
                            }
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>
                                Amount:
                            </Form.Label>
                            <Form.Control
                                isInvalid={this.state.amountError}
                                type="number"
                                value={this.state.amount}
                                onChange={e=>this.setState({amount: e.target.value})}
                            />
                            {
                                this.state.amountError ?
                                    <Form.Control.Feedback type="invalid">
                                        Please choose an expense amount.
                                    </Form.Control.Feedback>
                                    :
                                    ''
                            }
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>
                                Price:
                            </Form.Label>
                            <Form.Control
                                isInvalid={this.state.priceError}
                                type="number"
                                value={this.state.price}
                                onChange={e=>this.setState({price: e.target.value})}
                            />
                            {
                                this.state.priceError ?
                                    <Form.Control.Feedback type="invalid">
                                        Please choose an expense price.
                                    </Form.Control.Feedback>
                                    :
                                    ''
                            }
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>
                                Category:
                            </Form.Label>
                            <Form.Control as="select"
                                type="text"
                                isInvalid={this.state.categoryError}
                                onChange={e=>this.setState({category: e.target.value})}
                            >
                                <option key={0}></option>
                                {
                                    this.state.categories.map((category, index)=>
                                        <option key={category.id} value={category.id}>{capitalizeFLetter(category.name)}</option>
                                    )
                                }
                            </Form.Control>
                            {
                                this.state.categoryError ?
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a valid category.
                                    </Form.Control.Feedback>
                                    :
                                    ''
                            }
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={() => {
                                    this.setState({
                                        name: '',
                                        amount: '',
                                        price: '',
                                        category: '',
                                        nameError: false,
                                        amountError: false,
                                        priceError: false,
                                        categoryError: false
                                    })
                                    this.props.onClick()
                                }}>Close</Button>
                        <Button variant="primary"
                                onClick={this.addExpense}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default CreateExpenseModal;
