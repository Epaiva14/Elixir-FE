"use client";
import '../../css/bulma.css';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import Layout from '../../components/layout';
import BackgroundImage from '../../components/backgroundImage';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';


export default function Profile() {
    // state is what the data is representing in realtime
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);


    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();
        console.log(expirationTime, localStorage);

        // make a condition that compares exp and current time
        if (currentTime >= expirationTime) {
            handleLogout();
            alert('Session has ended. Please login to continue.');
            router.push('/users/login');
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    // console.log(response.data);
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setData(response.data.users[0]);
                        setLoading(false);
                    } else {
                        router.push('/users/login');
                    }

                })
                .catch((error) => {
                    console.log(error);
                    router.push('/users/login');
                });
        } else {
            router.push('/users/login');
        }
    }, [router]);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;
    return (
        <>
            <Layout>
                <div className='divStyle'>

                    <div className='profileSection'>

                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                        <h4>{data.username}</h4>
                        <p className="text-secondary mb-1">{data.birthdate}</p>
                        <p className="text-muted font-size-sm">{data.email}</p>
                        <button className="btn btn-primary">Follow</button>
                        <button className="btn btn-outline-primary">Message</button>

                    </div>

                </div>



            </Layout>
        </>
    );
}




// <div className="container">
//                     <div className="main-body">
//                         <nav aria-label="breadcrumb" className="main-breadcrumb">
//                             <ol className="breadcrumb">
//                                 <li className="breadcrumb-item" onClick={handleLogout}><a href="">Logout</a></li>
//                             </ol>
//                         </nav>
//                         <div className="row gutters-sm">
//                             <div className="col-md-4 mb-3">
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <div className="d-flex flex-column align-items-center text-center">
//                                             {/* <Image 
//                                     src="https://bootdey.com/img/Content/avatar/avatar7.png"
//                                     alt="Admin"
//                                     className="rounded-circle"
//                                     width="150"
//                                     height={"150"}
//                                     /> */}
//                                             <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
//                                             <div className="mt-3">
//                                                 <h4>{data.username}</h4>
//                                                 {/* <p className="text-secondary mb-1">{data.birthdate}</p> */}
//                                                 {/* <p className="text-muted font-size-sm">{pastecodehere}</p> */}
//                                                 <button className="btn btn-primary">Follow</button>
//                                                 <button className="btn btn-outline-primary">Message</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-md-8">
//                                 <div className="card mb-3">
//                                     <div className="card-body">
//                                         <div className="row">
//                                             <div className="col-sm-3">
//                                                 <h6 className="mb-0">Full Name</h6>
//                                             </div>
//                                             <div className="col-sm-9 text-secondary">
//                                                 {data.fullName}
//                                             </div>
//                                         </div>
//                                         <hr />
//                                         <div className="row">
//                                             <div className="col-sm-3">
//                                                 <h6 className="mb-0">Email</h6>
//                                             </div>
//                                             <div className="col-sm-9 text-secondary">
//                                                 {data.email}
//                                             </div>
//                                         </div>
//                                         <hr />
//                                         <div className="row">
//                                             <div className="col-sm-3">
//                                                 <h6 className="mb-0">Location</h6>
//                                             </div>
//                                             <div className="col-sm-9 text-secondary">
//                                                 {data.location}
//                                                 <br />
//                                             </div>
//                                         </div>
//                                         <hr />
//                                         <div className="row">
//                                             <div className="col-sm-3">
//                                                 <h6 className="mb-0">Birthdate</h6>
//                                             </div>
//                                             <div className="col-sm-9 text-secondary">
//                                                 {data.birthdate}
//                                                 <br />
//                                             </div>
//                                         </div>
//                                         <hr />
//                                         <div className="row">
//                                             <div className="col-sm-12">
//                                                 <a className="btn btn-info " target="__blank" href="/users/edit">Edit</a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row gutters-sm">
//                                     <div className="col-sm-6 mb-3">
//                                         <div className="card h-100">
//                                             <div className="card-body">
//                                                 <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Recipe</i>Project Status</h6>

//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-sm-6 mb-3">
//                                         <div className="card h-100">
//                                             <div className="card-body">
//                                                 <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Recipe</i>Project Status</h6>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div >