'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import Link from 'next/link';

import '../css/bulma.css';
import '../css/index.css';
import Layout from "@/app/components/layout";
import SingleTemplate from "./singleTemplate";

export default function Recipe() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [recipesLoading, setRecipesLoading] = useState(true);
    const [recipe, setRecipe] = useState();
    let recipeId;


    if (typeof window !== 'undefined') {
        recipeId = JSON.parse(localStorage.getItem('recipeId'));
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
    
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipeId}`)
        .then(response => {
            setRecipe(response.data.recipe);
            setRecipesLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [recipeId]);

    if (recipesLoading || isLoading) return <p>Loading ...</p>;

    return (
        <>
            <Layout>
                {(recipe ? <SingleTemplate recipe={recipe} /> : <p>Recipe not found. <Link href='/search'>Search</Link> for recipes.</p>)}
            </Layout>
        </>
    )
}