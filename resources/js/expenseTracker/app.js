require('../bootstrap');

import React from "react";
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <switch>
                        <Route path="/">
                            XD
                        </Route>
                        {/*<Route exact path='/' component={Dashboard} />*/}
                        <Route path="/login">
                            //Login
                        </Route>
                    </switch>
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
