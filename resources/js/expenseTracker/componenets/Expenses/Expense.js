import React from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import ExpenseFilter from "./expenseFilter";
import CreateExpenseModal from "./createExpenseModal";
import EditExpenseModal from './editExpenseModal';
import {formatDate, capitalizeFLetter} from '../../functions';
import moment from 'moment';
import PieChart from "../PieChart";
class Expense extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            index: 0,
            expenses: null,
            showCreateModel: false,
            status: false,
            danger: false,
            statusMessage: '',
            showEditModel: false,
            modalData: null,
            filterType: 0,
            filterData: null
        }
    }

    componentDidMount() {
        this.getExpenses({selected: 0});
    }

    //Filter

    filterData = (type = 0, parameters = null)=>{
        this.setState({
            filterType: type,
            filterData: JSON.stringify(parameters)
        }, ()=>{
            this.getExpenses({selected: 0});
        })
    }

    //Pagination:
    getExpenses = (data)=>{  //Function Returns Expenses depending on Filter Type
        if(this.state.filterType === 0){ //No Filter
            let page = data.selected >= 0 ? data.selected + 1 : 1;
            axios.get('/api/expenses?page='.concat(page.toString())).then(response=>{
                this.setState({
                    expenses: response.data
                });
            }).catch(error=>{
            });
        }
        if(this.state.filterType === 1){ //filter By Date
            let dates = JSON.parse(this.state.filterData);
            let page = data.selected >= 0 ? data.selected + 1 : 1;
            axios.post('/api/expenses/date?page='.concat(page.toString()), {
                start: moment.utc(dates.startDate).valueOf(),
                end: moment.utc(dates.endDate).valueOf()
            }).then(response=>{
                this.setState({
                    expenses: response.data
                });
            }).catch(error=>{
            });
        }
        if(this.state.filterType === 2){ //Filter By Category
            let category = JSON.parse(this.state.filterData);
            let page = data.selected >= 0 ? data.selected + 1 : 1;
            console.log(page);
            axios.post('/api/expenses/category?page='.concat(page.toString()), {
                category: category.id
            }).then(response=>{
                this.setState({
                    expenses: response.data
                });
            }).catch(error=>{
            });
        }
    }

    renderPagination = ()=>{
        const {current_page, from, last_page, per_page, to, total} = this.state.expenses;
        return(
            <div style={{width: '98%', margin: "auto"}}>
                <ReactPaginate
                    pageCount={last_page}
                    initialPage={current_page - 1}
                    forcePage={current_page - 1}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    previousLabel="&#x276E;"
                    nextLabel="&#x276F;"
                    containerClassName="pagination justify-content-center"
                    activeClassName="uk-active"
                    disabledClassName="uk-disabled"
                    onPageChange={(data)=>{this.getExpenses(data);}}
                    disableInitialCallback={false}
                />
            </div>
        );
    }

    renderExpenses = ()=>{
        const { from } = this.state.expenses;
        return(
            <tbody>
            {
                this.state.expenses.data.map((expense, index) =>
                    <tr key={expense.id}>
                        <td>{index+from}</td>
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
                )
            }
            </tbody>
        );
    }

    //Expense Functions
    deleteExpense = (expense)=>{
        axios.get('api/expenses/delete/'.concat(expense.id)).then(response=>{
            if(response.status===200 && response.data.success === true) {
                let index = this.state.expenses.data.indexOf(expense);
                let Expenses = this.state.expenses;
                let oldExpenses = Expenses.data.slice()
                oldExpenses.splice(index, 1);
                Expenses.data = oldExpenses;
                this.setState({
                    expenses: Expenses,
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
            this.getExpenses({selected: this.state.expenses.current_page});
            this.setState({
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
            let index = this.state.index
            let Expenses = this.state.expenses;
            let oldExpenses = Expenses.data.slice()
            oldExpenses.splice(index, 1, data);
            Expenses.data = oldExpenses;
            this.setState({
                expenses: Expenses,
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
            index: this.state.expenses.data.indexOf(expense),
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
              <div align="center" id={"navBar"}>
                  <h1 style={{textAlign: "center",color: "gray"}}>Welcome To Expense Tracker</h1>
                  <p style={{textAlign: "center",color:"black"}}>Here are the List of Expenses</p>
                  <br/><br/>
               </div>
              <div id="mainBody">
                  <div style={{width: '34%', float: 'left'}}>
                      <PieChart />
                  </div>
                  <div style={{width: '63%', float: 'right'}}>
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
                      <div className={"row"} style={{width: '98%', margin: "auto"}}>
                          <div>
                              <a className="addButton" style={{cursor: "pointer"}}
                                 onClick={()=>{
                                     this.showCreateModel()
                                 }}>
                                  Add Expense
                              </a>
                          </div>
                          <ExpenseFilter onSearch={this.filterData}/>
                      </div>
                      <div>
                          <table id="t01" style={{width: '98%'}}>
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
                                {this.state.expenses && this.renderExpenses()}
                          </table>
                          <div >
                              { this.state.expenses && this.renderPagination() }
                          </div>
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
