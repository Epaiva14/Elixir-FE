"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import BackgroundImage from '@/app/components/backgroundImage';
import '../../css/bulma.css';

export default function Login() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        // fill in code
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        // fill in code
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password })
            .then(response => {
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('email', response.data.userData.email);
                localStorage.setItem('expiration', response.data.userData.exp);
                setAuthToken(response.data.token);
                let decoded = jwtDecode(response.data.token);
                setRedirect(true);
            })
            .catch(error => {
                if (error.response.data.message === 'Email already exists') {
                    console.log('===> Error in Signup', error.response.data.message);
                    setError(true);
                }
            });

    };

    if (redirect) { router.push('/users/profile'); }
    if (error) {
        return (
            <div>
                <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                    <div className="card-body text-center">
                        <div>
                            <p>Email already exists</p>
                            <br />
                            <h2>Login</h2>
                            <p>Sign In to your account</p>
                            <a href="/users/login" type="button" className="button is-outlined">Login</a>
                            <span>  </span>
                            <a href="/users/signup" type="button" className="button is-outlined">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <BackgroundImage />
            <div className="columns is-centered">
                <div className="column is-4">
                    <div className="login-card card">
                        <div className='card-header'>
                            <h1>Sign in to your account</h1>
                        </div>
                        <div className="card-content">
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <div className="control has-icons-left is-3">
                                        <input type="text" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
                                        <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <span className="icon is-small is-left"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword} required />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button type="submit" className="button is-small login-btn">Login</button>
                                    </div>
                                    <div className="card-footer-item">
                                        <button type="button" className="button is-small is-outlined">Forgot password?</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="column is-2">
                    <div className="card">
                        <div className="card-body text-center">
                            <div>
                                <h2>Sign up</h2>
                                <p>Get started now by creating an account.</p>
                                <a href="/users/signup" type="button" className="btn btn-primary active mt-3">Register Now!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}