'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import Layout from '@/app/components/layout';
import RecipeScrollTile from '@/app/components/recipes/recipeScrollTile';
import genericAvatar from '@/app/assets/avatar.png';

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

        if (currentTime >= expirationTime) {
            handleLogout();
            router.push('/users/login');
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
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
                <div className='column is-4'>
                    <div className='card comment-conatiner'>
                        <div class="card-image">
                            <figure class="image is-square">
                                <img src={data.avatar ? data.avatar : genericAvatar.src} alt="avatar" width="150" />
                            </figure>
                        </div>
                        <div className='card-content'>
                            <h2 className='title is-5'>{data.username}</h2>
                            <h6 className="mb-0"><strong>Full Name: </strong>{data.fullName} </h6>
                            <p className="text-secondary mb-1"><strong>Birthday:</strong> {data.birthdate}</p>
                            <p className="text-muted font-size-sm"><strong>Email: </strong>{data.email}</p>
                            <p className="text-muted font-size-sm"><strong>Residence: </strong>{data.location}</p>   
                        </div>
                        <div className='card-footer'>
                            <a className="button card-footer-item login-btn" href="/users/edit">Edit</a>
                            <a className="button card-footer-item signup-btn" onClick={handleLogout} href="/users/login">Logout</a>
                        </div>
                    </div>
                </div>
                <div className='column is-5'>
                    <RecipeScrollTile type='my' number='all' id='my-tile' />
                </div>
            </Layout >
        </>
    );
}