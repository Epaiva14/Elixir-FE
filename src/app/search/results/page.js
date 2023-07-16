'use client';
import '../../css/bulma.css';
import Layout from '../../components/layout';
import BackgroundImage from '../../components/backgroundImage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchResults() {
    const router = useRouter();
    const [recipeRedirect, setRecipeRedirect] = useState(false);
    let searchResults = JSON.parse(localStorage.getItem('searchResults'));
    
    useEffect(() => {
        if (recipeRedirect) {
            localStorage.setItem('recipeId', JSON.stringify(recipeRedirect));
            router.push('/recipe');
        }
    }, [recipeRedirect, router]);

    return (
        <>
            <Layout>
                {searchResults ? searchResults.map(recipe => {
                    return <div key={recipe._id} onClick={() => setRecipeRedirect(recipe._id)}>{recipe.name}</div>
                }) : ''}
                <BackgroundImage />
            </Layout>
        </>
    );
}