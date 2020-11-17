import React from 'react';
import axios from "axios";
import CreateExpenseModal from "./modal";

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

    //Create Modal Functions
    handleSaveCreateModel = (data)=>{
        console.log(data);
        this.setState({
            showCreateModel: false
        })
    };

    showCreateModel = ()=>{
        this.setState({
            showCreateModel: true
        })
    };

    closeCreateModel = ()=>{
        this.setState({
            showCreateModel: false
        })
    }

    //Edit Modal Functions
    handleSave = (fromModal) => {
        console.log("xd");
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
               <CreateExpenseModal
                   show={this.state.showCreateModel}
                   title={"Create Expense"}
                   onClick={this.closeCreateModel}
                   onHide={this.closeCreateModel}
                   onSave={this.handleSaveCreateModel}/>
          </div>
        );
    }

}


export default Expense;
