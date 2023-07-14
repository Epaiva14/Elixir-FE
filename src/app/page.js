'use client';
import './css/bulma.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import Layout from './components/layout';
import Card from './components/card';
import BackgroundImage from './components/backgroundImage';
import RecipePreviewContainer from './components/recipes/recipePreviewContainer';
import RecipeScrollTile from './components/recipes/recipeScrollTile';

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/trending/5`)
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
