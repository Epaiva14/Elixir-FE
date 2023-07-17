'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import '../css/bulma.css';
import Layout from '../components/layout';
import RecipeScrollTile from '../components/recipes/recipeScrollTile';
import BackgroundImage from '../components/backgroundImage';
import SearchForm from '../search/searchForm'


export default function Home() {
    // state is what the data is representing in realtime
    const router = useRouter();
    const [data, setData] = useState(null);
    const [recipes, setRecipes] = useState(null);
    const [recipesLoading, setRecipesLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);


    if (typeof window !== 'undefined') {
        const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
        let currentTime = Date.now();

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

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/trending/20`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes);
                setRecipesLoading(false);
            });
    }, []);

    if (isLoading || recipesLoading) return <p>Loading...</p>;

    return (
        <>
            <Layout>
                <div className='column'>
                        <RecipeScrollTile recipes={recipes} />
                </div>
                <div className='column'>
                        <span className='title is-2'>Search for Recipes</span>
                        <SearchForm />
                </div>
            </Layout>
        </>
    )
}
