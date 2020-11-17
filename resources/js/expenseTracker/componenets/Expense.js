import React from 'react';
import axios from "axios";
import CustomModal from "./modal";

class Expense extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            expenses: [],
            showCreateModel: false,
            showEditModel: false,
            modalData: null
        }
    }

    componentDidMount() {
        axios.get('/api/expenses').then(response=>{
            this.setState({
                expenses: response.data.expenses
            });
        }).catch(error=>{
            console.log(error);
        });
    }

    //Modal Functions
    handleSave = (fromModal) => {
        console.log("xd");
    };

    showCreateModel = ()=>{
        this.setState({
            showCreateModel: true
        })
    };

    handleShow = (task) => {
        this.setState({
            show: true,
            modalData: task
        })
    };

    handleClose = () => {
        this.setState({
            show: false,
            modalData: null
        });
    };


    render() {
        return(
          <div>
              <div align="center">
                  <h1 style={{textAlign: "center",color: "gray"}}>Welcome To Expense Tracker</h1>
                  <p style={{textAlign: "center",color:"black"}}>Here are the List of Expenses</p>
                  <br/><br/>
               </div>
              <div id="mainBody">
                  <div>
                      <a className="addButton" style={{cursor: "pointer"}}
                          onClick={()=>{
                            this.showCreateModel()
                          }}>
                          Add Expense
                      </a>
                      <div>
                          <table id="t01">
                              <thead>
                                  <tr>
                                      <th>Item Number</th>
                                      <th>Item Name</th>
                                      <th>Amount</th>
                                      <th>Price</th>
                                      <th>Date</th>
                                      <th>Category</th>
                                      <th>Actions</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>0</td>
                                      <td>ASUS COMPUTER</td>
                                      <td>321</td>
                                      <td>123</td>
                                      <td>2020-11-16 23:46:00</td>
                                      <td>Laps</td>
                                      <td>
                                          <div><a className="actionButton" style={{cursor: "pointer"}}>Edit</a><a
                                              className="actionButton" style={{cursor: "pointer"}}>Delete</a></div>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
               <CustomModal
                   show={this.state.showCreateModel}
                   title={"Create Expense"}
                   data={null}
                   type={0}
                   onClick={this.handleClose}
                   onHide={this.handleClose}
                   onSave={this.handleSave}/>
          </div>
        );
    }

}


export default Expense;
