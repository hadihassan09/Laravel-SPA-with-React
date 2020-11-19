import React from 'react';
import axios from "axios";
import CreateExpenseModal from "./createExpenseModal";
import EditExpenseModal from './editExpenseModal';
import {formatDate, capitalizeFLetter} from '../../functions'

class Expense extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            index: 0,
            expenses: [],
            showCreateModel: false,
            status: false,
            danger: false,
            statusMessage: '',
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

    //Expense Functions

    deleteExpense = (expense)=>{
        axios.get('api/expenses/delete/'.concat(expense.id)).then(response=>{
            if(response.status===200 && response.data.success === true) {
                let index = this.state.expenses.indexOf(expense);
                let oldExpenses = this.state.expenses.slice();
                oldExpenses.splice(index, 1);
                this.setState({
                    expenses: oldExpenses,
                    status: true,
                    danger: false,
                    statusMessage: 'Expense Deleted Successfully'
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({
                            status: false
                        })
                    }, 3000);
                });
            }else{
                this.setState({
                    status: true,
                    danger: true,
                    statusMessage: 'Expense Could Not Be Deleted'
                }, ()=>{
                    setTimeout(()=>{
                        this.setState({
                            status: false
                        })
                    }, 3000);
                });
            }
        }).catch(error=>{
            this.setState({
                status: true,
                danger: true,
                statusMessage: 'Expense Could Not Be Deleted'
            }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        status: false
                    })
                }, 3000);
            });
        })
    };



    //Create Modal Functions
    handleSaveCreateModel = (data, success)=>{
        if(success === true){
            this.setState({
            });
            this.setState({
                expenses: this.state.expenses.concat(data),
                showCreateModel: false,
                status: true,
                danger: false,
                statusMessage: 'Expense Added Successfully'
            }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        status: false
                    })
                }, 3000);
            });
        }else{
            this.setState({
                showCreateModel: false,
                status: true,
                danger: true,
                statusMessage: 'Expense Could Not Be Added'
            }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        status: false
                    })
                }, 3000);
            });
        }

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
    handleSaveEditModal = (data, success) => {
        if(success === true){
            let oldExpenses = this.state.expenses;
            oldExpenses.splice(this.state.index, 1, data);
            this.setState({
                expenses: oldExpenses,
                status: true,
                danger: false,
                showEditModel: false,
                modalData: null,
                statusMessage: 'Expense Updated Successfully'
            }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        status: false
                    })
                }, 3000);
            });
        }else{
            this.setState({
                status: true,
                showEditModel: false,
                modalData: null,
                danger: true,
                statusMessage: 'Expense Could Not Be Updated'
            }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        status: false
                    })
                }, 3000);
            });
        }
    };


    handleShowEditModal = (expense) => {
        this.setState({
            index: this.state.expenses.indexOf(expense),
            showEditModel: true,
            modalData: expense
        });
    };

    handleCloseEditModal = () => {
        this.setState({
            showEditModel: false,
            modalData: null
        });
    };

    renderEditModal = ()=>{
        if(this.state.showEditModel === true)
            return (
                <EditExpenseModal
                    show={this.state.showEditModel}
                    title={"Edit Expense"}
                    data={this.state.modalData}
                    onClick={this.handleCloseEditModal}
                    onHide={this.handleCloseEditModal}
                    onSave={this.handleSaveEditModal}/>
            );
        else
            return(
                <>
                </>
            );
    }


    render() {
        return(
          <div>
              <div align="center">
                  <h1 style={{textAlign: "center",color: "gray"}}>Welcome To Expense Tracker</h1>
                  <p style={{textAlign: "center",color:"black"}}>Here are the List of Expenses</p>
                  <br/><br/>
               </div>
              {
                  this.state.status ?
                      this.state.danger ?
                          <div className="alert alert-danger wrapper inMiddle" style={{marginTop: 10, textAlign: 'center'}}>
                              {this.state.statusMessage}
                          </div>
                          :
                          <div className="alert alert-success wrapper inMiddle" style={{marginTop: 10, textAlign: 'center'}}>
                              {this.state.statusMessage}
                          </div>
                      : ''
              }
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
                                    {this.state.expenses.map((expense,index)=>
                                        <tr key={expense.id}>
                                            <td>{index}</td>
                                            <td>{expense.item}</td>
                                            <td>{expense.amount}</td>
                                            <td>{expense.price}</td>
                                            <td>{formatDate(expense.created_at)}</td>
                                            <td>{capitalizeFLetter(expense.category.name)}</td>
                                            <td>
                                                <div className={"h3"}>
                                                    <i style={{marginRight: 15}}
                                                       className="fas fa-edit text-blue-200 hover:text-blue-600 cursor-pointer"
                                                       onClick={() => {
                                                            this.handleShowEditModal(expense);
                                                       }}></i>
                                                    <i
                                                       className="fas fa-times text-red-200 hover:text-red-600 cursor-pointer"
                                                       onClick={() => {
                                                           this.deleteExpense(expense);
                                                       }}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
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
              { this.renderEditModal() }
          </div>
        );
    }

}


export default Expense;
