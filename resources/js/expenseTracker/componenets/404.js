import React from "react";

class Error extends React.Component{


    render() {
        return(
            <div id={"mainBody"}>
                <div
                    style={{'min-height': '100%'}}
                    className="relative flex items-top justify-center bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                    <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex items-center pt-8 sm:justify-start sm:pt-0">
                            <div className="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                                404
                            </div>

                            <div className="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                                Not Found
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Error;
