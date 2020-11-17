import React, { Component } from "react";
import {Modal, Button, FormGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class CreateExpenseModal extends Component {
    constructor(props) {
        super(props);

        this.state={
            name: '',
            amount: 0,
            price: 0,
            category: '',
        }

    }

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>

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
                                type="text"
                                value={this.state.name}
                                onChange={e=>this.setState({name: e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>
                                Amount:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={this.state.amount}
                                onChange={e=>this.setState({amount: e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>
                                Price:
                            </Form.Label>
                            <Form.Control
                                type="number"
                                value={this.state.price}
                                onChange={e=>this.setState({price: e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>
                                Category:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.category}
                                onChange={e=>this.setState({category: e.target.value})}
                            />
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={() => this.props.onClick()}>Close</Button>
                        <Button variant="primary"
                                onClick={() => this.props.onSave(this.state)}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default CreateExpenseModal;


// <CustomModal
//     show={this.state.show}
//     title={"Edit Task"}
//     data={this.state.modalData}
//     onClick={this.handleClose}
//     onHide={this.handleClose}
//     onSave={this.handleSave}/>


// handleSave = (fromModal) => {
// }
//
// handleShow = (task) => {
//     this.setState({
//         show: true,
//         modalData: task
//     })
// };
//
// handleClose = () => {
//     this.setState({
//         show: false,
//         modalData: null
//     });
// };
