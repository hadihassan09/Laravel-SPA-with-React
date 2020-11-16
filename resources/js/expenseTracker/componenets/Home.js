import React from 'react';
import appState from "../appState";

class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <>
                Hello This is Home
                {console.log(appState)}
            </>
        );
    }
}

export default Home;
