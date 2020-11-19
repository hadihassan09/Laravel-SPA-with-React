import React, { Component } from "react";
import {Modal, Button, FormGroup, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {capitalizeFLetter} from "../../functions";

class EditCategoryModal extends Component {
    constructor(props) {
        super(props);

        this.state={
            name: this.props.data.item,
            nameError: false,
        }
    }

    updateCategory = ()=>{
        axios.post('/api/categories/update/'.concat(this.props.data.id),{
            name: this.state.name,
        }).then(response=>{
            this.setState({
                name: '',
                nameError: false,
            })
            this.props.onSave(response.data.category[0], response.data.success);
        }).catch(error=>{
            try{
                if(error.response && error.response.status === 422){
                    if(error.response.data.errors.name)
                        this.setState({
                            nameError: true
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
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <Form.Label>
                                Category Name:
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
                                        Please enter a Category Name.
                                    </Form.Control.Feedback>
                                    :
                                    ''
                            }
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={() => this.props.onClick()}>Close</Button>
                        <Button variant="primary"
                                onClick={this.updateCategory}>Submit</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default EditCategoryModal;
