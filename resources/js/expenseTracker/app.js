require('../bootstrap');
import React from "react";
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Login from './componenets/Login';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Expense Tracker
                        </Link>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li>
                    </nav>
                    <Switch>
                        <Route exact path="/" />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <App />
        , document.getElementById('app'));
}
