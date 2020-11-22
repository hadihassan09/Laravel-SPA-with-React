import SignUp from "./componenets/SignUp";

require('../bootstrap');
import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import appState from "./appState";
import Login from './componenets/Login';
import Home from "./componenets/Home";
import Expense from './componenets/Expenses/Expense';
import Categories from "./componenets/Categories/Categories";
import {capitalizeFLetter} from './functions';
import PieChart from "./componenets/PieChart";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: false,
            toHome: false,
            user: ''
        }
    }

    componentDidMount() {
        setInterval(()=>{
            if(this.state.isLoggedIn !== appState.isLoggedIn)
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    toHome: false,
                    user: appState.user
                });
        }, 1000)
    }


    render() {
        if (this.state.isLoggedIn === false){
            return (
                <Router>
                    {this.state.toHome ? <Redirect to={'/'} /> : '' }
                    <div id={"navBar"}>
                        <nav>
                            <ul>
                                <li style={{"float": "left"}}><Link to={"/"} style={{"cursor": "pointer"}} className="LOGO">Expense Tracker</Link>
                                </li>
                                <li style={{"float": "right"}}><Link to={"/login"} style={{"cursor": "pointer"}}>Login</Link></li>
                                <li style={{"float": "right"}}><Link to={"/signup"} style={{"cursor": "pointer"}}>Register</Link></li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/signup' component={SignUp}/>
                        </Switch>
                    </div>
                </Router>
            )
        }else{
            return (
                <Router>
                    <div id={"navBar"}>
                        <nav>
                            <ul>
                                <li style={{"float": "left"}}><Link to={"/"} style={{"cursor": "pointer"}} className="LOGO">Expense Tracker</Link>
                                </li>
                                <li style={{"float": "left"}}><Link to={"/expenses"} style={{"cursor": "pointer"}}>List Expenses</Link></li>
                                <li style={{"float": "left"}}><Link to={"/categories"} style={{"cursor": "pointer"}}>List Categories</Link></li>
                                <li style={{"float": "left"}}><Link to={"/pieChart"} style={{"cursor": "pointer"}}>View PieChart</Link></li>
                                <li style={{"float": "right"}}>
                                    <Link to={"/"} onClick={(e)=>{
                                        e.preventDefault();
                                        axios.get('/sanctum/csrf-cookie').then(response=>{
                                            axios.post('/logout').then(response=>{
                                                appState.logout();
                                                this.setState({
                                                    toHome: true,
                                                    isLoggedIn: false
                                                })
                                            }).catch(error=>{
                                            });
                                        })
                                    }}>
                                        Logout
                                    </Link>
                                </li>
                                <li style={{"float": "right"}}><Link to={"/"} style={{"cursor": "pointer"}}>Welcome {capitalizeFLetter(this.state.user.email)}</Link></li>
                            </ul>
                        </nav>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/expenses" component={Expense}/>
                            <Route exact path="/categories" component={Categories}/>
                            <Route exact path="/pieChart" component={PieChart}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={SignUp}/>
                        </Switch>
                    </div>
                </Router>
            )
        }
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <App />
        , document.getElementById('app'));
}
