import React from 'react';
import appState from "../appState";

class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div id="mainBody">
                <div className="welcome ">
                    <div className="title m-b-md">Expense Tracker</div>
                    <div className="links">
                        <p>
                            Done By:
                            <a href="https://www.linkedin.com/in/hassanhadi" target="_blank">
                                Hadi Hassan
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
