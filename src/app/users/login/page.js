"use client";
// import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import Layout from '@/app/components/layout';
import '../../css/bulma.css';

export default function Login() {

    const background = {
        backgroundColor : "#E3E0DE"
      }
    
      const buttonColor = {
        backgroundColor:"#E8BA9E"
      }
      const fontStyle = {
        fontWeight:"700",
        color: 'whitesmoke' ,
        textShadow: "0px 0px 5px #E8BA9E, 0px 0px 5px #E8BA9E"
      }

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

    if (redirect) { router.push('/'); }
    if (error) {
        return (
            <>
                <Layout>
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
                </Layout>
            </>
        );
    }

    return (
        // <>
        //     <Layout>
        //         <div className="columns is-centered">
        //             <div className="column">
        //                 <div className="login-card card">
        //                     <div className='card-header'>
        //                         <span><em><h1 className='login-title'>Sign in to your account</h1></em></span>
        //                     </div>
        //                     <div className="card-content">
        //                         <form onSubmit={handleSubmit}>
        //                             <div className="field">
        //                                 <div className="control is-3">
        //                                     <input type="text" className="input email-input" placeholder="Email" value={email} onChange={handleEmail} required />
        //                                     <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
        //                                 </div>
        //                             </div>
        //                             <div className="field">
        //                                 <div className="control">
        //                                     <span className="icon is-small is-left"><i className="fa fa-lock"></i></span>
        //                                     <input type="password" className="input password-input" placeholder="Password" value={password} onChange={handlePassword} required />
        //                                 </div>
        //                             </div>
        //                             <div className="card-footer is-responsive">
        //                                 <div className="card-footer-item is-responsive">
        //                                     <button type="submit" className="button is-small login-btn">Login</button>
        //                                 </div>
        //                                 <div className="card-footer-item is-responsive">
        //                                     <button type="button" className="button is-small forget-btn">Forgot password?</button>
        //                                 </div>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="column is-2">
        //                 <div className="card signup-card">
        //                     <div className="card-body text-center">
        //                         <div className='register-content'>
        //                             <h2 className='signup-title'>Don&apos;t have an account?</h2>
        //                             <p className='call-to-action'>Create one now to join the party</p>
        //                             <a href="/users/signup" type="button" className="button signup-btn">Take me to the bouncer</a>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </Layout>
        // </>


<Layout>
    <div className='column'></div>
    <div className="container box p-5 shadow rounded content" style={background}>
            <div className="columns is-four-sevenths">
    <div className='column '>
                <div className='column'>
                    <span><em><h1>Sign in to your account</h1></em></span>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="control">
                                <input type="text" className="input email-input" placeholder="Email" value={email} onChange={handleEmail} required />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input type="password" className="input password-input" placeholder="Password" value={password} onChange={handlePassword} required />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-small" style={buttonColor}>Login</button>
                            </div>
                            <div className="control">
                                <button type="button" className="button is-small">Forgot password?</button>
                            </div>
                        </div>
                    </form>
                    </div>
                    <hr />
                    <div className='column'>
                    <span><em><h1>Don&apos;t have an account?</h1></em></span>
                        <p><strong>Create one now to join the party</strong></p>
                        <a href="/users/signup" type="button" className="button signup-btn">Take me to the bouncer</a>
                    </div>
        </div>
    </div>
    </div>
    <div className='column'></div>

    <div className='container'>
    <div className="content has-text-centered">
      <h4 style={fontStyle}>The Twitter of Alcoholism</h4>
    <p>
    Elixir is a web app that provides an approachable entrance to creating mixed drinks and cocktails. 
    Elixir also provides a platform to stay up to date with the latest and most innovative recipes that people are posting.
    <br />
      <strong>Elixir 2023</strong> by US. 
      The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.  
    </p>
    </div>
</div>

</Layout>

    );
}