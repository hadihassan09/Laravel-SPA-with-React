import React from 'react';
import {Redirect} from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('/login', {
                    email: email,
                    password: password
                }).then(response => {
                    if (response.status === 204) {
                        setToHome(true);
:
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 422) {
                        setAuthError(true);
                    } else {
                        setUnknownError(true);
                        console.error(error);
                    }
                });
            });
    }
    if (toHome === true) {
        alert("Success");
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="email"
                                               className="col-md-4 col-form-label text-md-right">Email:</label>
                                        <div className="col-md-6">
                                            <input id="email" type="email"
                                                   className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
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
                                                   className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                                                   value={password}
                                                   placeholder="Password"
                                                   name="password" required autoComplete="current-password"
                                                   onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {authError ?
                                        <div className="alert alert-danger">Credentials not recognised. Please try
                                            again.</div> : null}
                                    {unknownError ?
                                        <div className="alert alert-danger">There was an error submitting your
                                            details.</div> : null}
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
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
    );
};

export default Login;
