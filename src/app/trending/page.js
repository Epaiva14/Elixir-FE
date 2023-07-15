'use client';
import '../css/bulma.css';
import { useEffect, useState } from 'react';
import Layout from '../components/layout'; 
import BackgroundImage from '../components/backgroundImage'; 
import RecipeScrollTile from '../components/recipes/recipeScrollTile';
import RecipeMainComponent from '../components/recipes/recipeScrollTile';


export default function Trending() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/trending/20`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <Layout>
                <RecipeScrollTile recipes={recipes} />
                <BackgroundImage />
            </Layout>
        </>
    )
}
