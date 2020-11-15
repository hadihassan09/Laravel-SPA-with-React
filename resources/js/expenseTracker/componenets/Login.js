import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }


    deleteAllCookies() {
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.default.withCredentials = true;
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/login', {
                    email: this.state.email,
                    password: this.state.password
                }).then(response => {
                    if(response.status === 204){
                        alert("login success")
                    }
                })
            });
    }


    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email:</label>
                                        <div className="col-md-6">
                                            <input id="email" type="email"
                                                   className="form-control"
                                                   name="email" value={this.state.email} required autoComplete="email" onChange={this.handleChange}
                                                   autoFocus/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password:</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password"
                                                   className="form-control"
                                                   value={this.state.password}
                                                   name="password" required autoComplete="current-password" onChange={this.handleChange}/>
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>

                                            {/*<a className="btn btn-link" href="{{ route('password.request') }}">*/}
                                            {/*    {{__('Forgot Your Password?')}}*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;
