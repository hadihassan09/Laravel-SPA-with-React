import React from 'react';
import {DropdownButton, Dropdown, Button, Row, Col, Form} from 'react-bootstrap';
import axios from "axios";
import {capitalizeFLetter} from "../../functions";
class ExpenseFilter extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            type: 0,
            startingDate: '',
            endingDate: '',
            category: '',
            categories: []
        }
    }

    componentDidMount() {
        let categories = null;
        axios.get('/api/categories').then(response=>{
            this.setState({
                categories: response.data.categories
            })
        }).catch(error=>{
        });
    }


    renderTypeDropDown = () => {
        return(
            <Col style={{margin: 'auto'}}>
                <DropdownButton id="dropdown-primary-button"
                                title={
                                    this.state.type === 0 ?
                                        "Filter By:"
                                        :
                                        this.state.type == 1 ?
                                            "Date"
                                            :
                                            "Category"
                                }
                                variant={'secondary'}
                                onSelect={(e)=>{
                                    this.setState({
                                        type: e
                                    });
                                }}
                >
                    <Dropdown.Item eventKey={1}>Date</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey={2}>Category</Dropdown.Item>
                </DropdownButton>
            </Col>

        );
    }

    renderDateInput = () => {
        return(
            <>
                <Col style={{margin: 'auto'}}>
                    From:
                </Col>
                <Col style={{margin: 'auto'}}>
                    <Form.Control placeholder="From" type={'date'}
                        onChange={(e)=>{
                            this.setState({
                                startingDate: e.target.value
                            });
                        }}
                    />
                </Col>
                <Col style={{margin: 'auto'}}>
                    To:
                </Col>
                <Col style={{margin: 'auto'}}>
                    <Form.Control placeholder="To" type={'date'}
                        onChange={(e) => {
                            this.setState({
                                endingDate: e.target.value
                            });
                        }}
                    />
                </Col>
            </>
        );
    }

    renderCategoryDropDown = () => {
        return (
                <Col style={{margin: 'auto'}}>
                    <DropdownButton id="dropdown-basic-button"
                                    title={
                                        this.state.category === "" ?
                                            "Select Category"
                                            :
                                            this.state.category.name
                                    }
                                    variant={'secondary'}
                                    onSelect={(e) => {
                                        e = JSON.parse(e);
                                        this.setState({
                                            category: e
                                        });
                                    }}
                    >
                        {
                            this.state.categories.map((category, index) =>
                                <div key={category.id}>
                                    <Dropdown.Item eventKey={JSON.stringify(category)}>{capitalizeFLetter(category.name)}</Dropdown.Item>
                                    {
                                        (index+1) === this.state.categories.length ?
                                            <></>
                                            :
                                            <Dropdown.Divider/>
                                    }
                                </div>
                            )
                        }
                    </DropdownButton>
                </Col>
        );
    }

    renderButton = ()=>{
        switch (parseInt(this.state.type)) {
            case 1:
                return(
                    <Button
                        variant={'secondary'}
                        onClick={()=>{
                            if(this.state.startingDate === '' || this.state.endingDate === '')
                                alert('Please Select The Dates To Search By');
                            else {
                                this.props.onSearch(1, {
                                    startDate: this.state.startingDate,
                                    endDate: this.state.endingDate
                                });
                            }
                        }}
                    >
                        Search
                    </Button>
                );
            case 2:
                return(
                    <Button
                        variant={'secondary'}
                        onClick={()=>{
                            if(this.state.category === '')
                                alert('Please Select A Category To Search By');
                            else
                                this.props.onSearch(2, {id: this.state.category.id});
                        }}
                    >
                        Search
                    </Button>
                );
            default:
                return(
                    <>
                    </>
                );
        }
    }


    render(){
        switch (parseInt(this.state.type)) {
            case 1:
                return(
                    <Row className={'bordershadow'} style={{marginLeft: 15}}>
                            {this.renderTypeDropDown()}
                            {this.renderDateInput()}
                        <Col style={{margin: 'auto'}}>
                            {this.renderButton()}
                        </Col>
                    </Row>
                );
            case 2:
                return(
                    <Row className={'bordershadow'} style={{marginLeft: 15}}>
                            {this.renderTypeDropDown()}
                        {this.renderCategoryDropDown()}
                        <Col style={{margin: 'auto'}}>
                            {this.renderButton()}
                        </Col>
                    </Row>
                );
            default:
                return(
                    <Row style={{marginLeft: 15, height: 52}}>
                        {this.renderTypeDropDown()}
                    </Row>
                );
        }
    }
}


export default ExpenseFilter;
