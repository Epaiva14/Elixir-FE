'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import RecipeScrollTile from '@/app/components/recipes/recipeScrollTile';
import '../../css/bulma.css';
import Layout from '../../components/layout';
import BackgroundImage from '../../components/backgroundImage';

export default function Profile() {
    // state is what the data is representing in realtime
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();
        // console.log(expirationTime, localStorage);

        // make a condition that compares exp and current time
        if (currentTime >= expirationTime) {
            handleLogout();
            alert('Please login to continue.');
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
                <div className='column is-half'>
                    <div className='profileSection'>
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                        <h2 className='username'>{data.username}</h2>
                        <button className="btn btn-primary">Follow</button>
                        <button className="btn btn-outline-primary">Message</button>
                        <br />
                        <br />
                        <a className="btn btn-info editButton" target="__blank" href="/users/edit">Edit</a>
                        <a className="breadcrumb-item logoutButton" onClick={handleLogout}><a href="/users/login">Logout</a></a>
                    </div>
                </div>
                <div className='column is-half'>
                    <div className="profileInfo">
                        <h6 className="mb-0"><strong>Full Name: </strong>{data.fullName} </h6>
                        <p className="text-secondary mb-1"><strong>Birthday:</strong> {data.birthdate}</p>
                        <p className="text-muted font-size-sm"><strong>Email: </strong>{data.email}</p>
                        <p className="text-muted font-size-sm"><strong>Residence: </strong>{data.location}</p>
                    </div>
                </div>
                <div className='column'>
                    <RecipeScrollTile type='my' number='all' id='my-tile' />
                </div>
            </Layout >
        </>
    );
}




// <div className="container">
//                     <div className="main-body">
//                       
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
//                                             
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