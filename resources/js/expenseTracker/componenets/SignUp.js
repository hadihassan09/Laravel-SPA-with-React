import React from 'react';
import {Redirect} from 'react-router-dom';
import appState from "../appState";
const SignUp = (props) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        setUnknownError(false);
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                }).then(response => {
                    if(response.status === 201){
                        axios.get('/api/user').then(response=>{
                            appState.login(response.data);
                        });
                    }
                    if(response.status === 302){
                        setEmailError(true);
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 422) {
                        if(error.response.data.errors.password){
                            setPasswordError(true);
                            setConfirmPasswordError(true);
                        }
                        if(error.response.data.errors.email){
                            setEmailError(true);
                        }
                    } else {
                        setUnknownError(true);
                    }
                });
            });
    }
    if (toHome === true) {
        // alert("Success");
    }
    return (
        <div id={"mainBody"}>
            <div><h1 style={{"textAlign": "center", color: "gray"}}>Welcome To Expense Tracker</h1><p
                style={{"textAlign": "center", color: "black"}}>Please Create an Account To Proceed</p>
                <div align={"center"} style={{font: "14px sans-serif"}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">Register</div>

                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group row">
                                                <label htmlFor="name"
                                                       className="col-md-4 col-form-label text-md-right">Name:</label>
                                                <div className="col-md-6">
                                                    <input id="name" type="text"
                                                           className={"form-control" + (unknownError ? ' is-invalid' : '')}
                                                           name="name" value={name} required autoComplete="name"
                                                           onChange={e => setName(e.target.value)}
                                                           placeholder="Name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="email"
                                                       className="col-md-4 col-form-label text-md-right">Email:</label>
                                                <div className="col-md-6">
                                                    <input id="email" type="email"
                                                           className={"form-control" + (emailError || unknownError ? ' is-invalid' : '')}
                                                           name="email" value={email} required autoComplete="email"
                                                           onChange={e => setEmail(e.target.value)}
                                                           placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="password"
                                                       className="col-md-4 col-form-label text-md-right">Password:</label>
                                                <div className="col-md-6">
                                                    <input id="password" type="password"
                                                           className={"form-control" + (passwordError || unknownError ? ' is-invalid' : '')}
                                                           value={password}
                                                           placeholder="Password"
                                                           name="password" required autoComplete="current-password"
                                                           onChange={e => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="password-confirmation"
                                                       className="col-md-4 col-form-label text-md-right">Password Confirmation:</label>
                                                <div className="col-md-6">
                                                    <input id="password-confirm" type="password"
                                                           className={"form-control" + (confirmPasswordError || unknownError ? ' is-invalid' : '')}
                                                           value={passwordConfirmation}
                                                           placeholder="Password"
                                                           name="password_confirmation" required autoComplete="new-password"
                                                           onChange={e => setPasswordConfirmation(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {unknownError ?
                                                <div className="alert alert-danger">There was an error submitting your
                                                    details.</div> : null}
                                            <div className="form-group row mb-0">
                                                <div className="col-md-4 offset-md-4">
                                                    <button type="submit" className="btn btn-primary">
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


