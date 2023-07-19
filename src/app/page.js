'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import './css/bulma.css';
import Layout from './components/layout';
import RecipeScrollTile from './components/recipes/recipeScrollTile';
import SearchForm from './search/searchForm';


export default function Home() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);


    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

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

    return (
        <>
            <Layout>

                <div className='column is-5 is-responsive'>
                    <RecipeScrollTile type='trending' number='20' />
                </div>
                <div className='column is-responsive'>
                    <SearchForm />
                    <div className='columns is-responsive'>
                        <div className='column is-three-fourths is-responsive'>
                            <RecipeScrollTile type='favorite' number='all' id='my-tile' />
                        </div>
                    </div>
                </div>


            </Layout>
        </>
    )
}