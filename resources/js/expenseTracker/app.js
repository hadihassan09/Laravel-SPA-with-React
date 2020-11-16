require('../bootstrap');
import React from "react";
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import appState from "./appState";
import Login from './componenets/Login';
import Home from "./componenets/Home";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: appState.isLoggedIn
        }
    }


    componentDidMount() {
        setInterval(()=>{
            this.setState({
                isLoggedIn: appState.isLoggedIn
            })
        }, 2000)
    }

    render() {
        if (this.state.isLoggedIn == false){
            return (
                <Router>
                    <div>
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <Link to={"/"} className="navbar-brand">
                                Expense Tracker
                            </Link>
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li>
                        </nav>
                        <Switch>
                            <Route exact path="/home" component={Home}/>
                            <Route exact path='/login' component={Login}/>
                        </Switch>
                    </div>
                </Router>
            )
        }else{
            return (
                <Router>
                    <div>
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <Link to={"/"} className="navbar-brand">
                                Expense Tracker
                            </Link>
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li>
                        </nav>
                        <Switch>
                            <Route exact path="/" component={Home}/>
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
