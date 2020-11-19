import React from 'react';
import axios from "axios";
import {formatDate, capitalizeFLetter} from '../../functions'
import CreateCategoryModal from "./createCategoryModal";
import EditCategoryModal from "./editCategoryModal";

class Categories extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            index: 0,
            categories: [],
            showCreateModel: false,
            status: false,
            danger: false,
            statusMessage: '',
            showEditModel: false,
            modalData: null
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

    //Category Functions

    deleteCategory = (category)=>{
        axios.get('api/categories/delete/'.concat(category.id)).then(response=>{
            if(response.status===200 && response.data.success === true) {
                let index = this.state.categories.indexOf(category);
                let oldCategories = this.state.categories.slice();
                oldCategories.splice(index, 1);
                this.setState({
                    categories: oldCategories,
                    status: true,
                    danger: false,
                    statusMessage: 'Category Deleted Successfully'
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
                    statusMessage: 'Category Could Not Be Deleted'
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
                statusMessage: 'Category Could Not Be Deleted'
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
                categories: this.state.categories.concat(data),
                showCreateModel: false,
                status: true,
                danger: false,
                statusMessage: 'Category Added Successfully'
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
                statusMessage: 'Category Could Not Be Added'
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

    // //Edit Modal Functions
    handleSaveEditModal = (data, success) => {
        if(success === true){
            let oldCategories = this.state.categories;
            oldCategories.splice(this.state.index, 1, data);
            this.setState({
                categories: oldCategories,
                status: true,
                danger: false,
                showEditModel: false,
                modalData: null,
                statusMessage: 'Category Updated Successfully'
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
                statusMessage: 'Category Could Not Be Updated'
            }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        status: false
                    })
                }, 3000);
            });
        }
    };


    handleShowEditModal = (category) => {
        this.setState({
            index: this.state.categories.indexOf(category),
            showEditModel: true,
            modalData: category
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
                <EditCategoryModal
                    show={this.state.showEditModel}
                    title={"Edit Category"}
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
                    <p style={{textAlign: "center",color:"black"}}>Here are the List of Categories</p>
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
                            Add Category
                        </a>
                        <div>
                            <table id="t01">
                                <thead>
                                <tr>
                                    <th>Category Number</th>
                                    <th>Category Name</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.categories.map((category,index)=>
                                    <tr key={category.id}>
                                        <td>{index}</td>
                                        <td>{capitalizeFLetter(category.name)}</td>
                                        <td>{formatDate(category.created_at)}</td>
                                        <td>
                                            <div className={"h3"}>
                                                <i style={{marginRight: 15}}
                                                   className="fas fa-edit text-blue-200 hover:text-blue-600 cursor-pointer"
                                                   onClick={() => {
                                                       this.handleShowEditModal(category);
                                                   }}></i>
                                                <i
                                                    className="fas fa-times text-red-200 hover:text-red-600 cursor-pointer"
                                                    onClick={() => {
                                                        this.deleteCategory(category);
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
                <CreateCategoryModal
                    show={this.state.showCreateModel}
                    title={"Create Category"}
                    onClick={this.closeCreateModel}
                    onHide={this.closeCreateModel}
                    onSave={this.handleSaveCreateModel}/>
                { this.renderEditModal() }
            </div>
        );
    }

}


export default Categories;
