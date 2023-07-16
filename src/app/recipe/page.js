'use client'
import '../css/bulma.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from "@/app/components/layout";
import BackgroundImage from "@/app/components/backgroundImage";
import SingleTemplate from "./singleTemplate";
import Link from 'next/link';

export default function Recipe() {
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState();

    const recipeId = JSON.parse(localStorage.getItem('recipeId'));
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipeId}`)
        .then(response => {
            setRecipe(response.data.recipe);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [recipeId]);

    if (isLoading) return <p>Loading ...</p>;

    return (
        <>
            <Layout>
                {(recipe ? <SingleTemplate recipe={recipe} /> : <p>Recipe not found. <Link href='/search'>Search</Link> for recipes.</p>)}
                <BackgroundImage />
            </Layout>
        </>
    )
}