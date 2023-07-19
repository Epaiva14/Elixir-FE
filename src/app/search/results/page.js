'use client';
import '../../css/bulma.css';
import Layout from '../../components/layout';
import BackgroundImage from '../../components/backgroundImage';
import RecipeScrollTile from '@/app/components/recipes/recipeScrollTile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchResults() {
    const router = useRouter();
    const [recipeRedirect, setRecipeRedirect] = useState(false);
    let searchResults;

    if (typeof window !== 'undefined') {
        searchResults = JSON.parse(localStorage.getItem('searchResults'));
    }
    
    useEffect(() => {
        if (recipeRedirect) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('recipeId', JSON.stringify(recipeRedirect));
                router.push('/recipe');
            }
        }
    }, [recipeRedirect, router]);

    return (
        <>
            <Layout>
                {/* {searchResults ? searchResults.map(recipe => {
                    return <div key={recipe._id} onClick={() => setRecipeRedirect(recipe._id)}>{recipe.name}</div>
                }) : ''} */}
                <div className='column'>
                </div>
                <div className='column is-5'>
                    <RecipeScrollTile type='search' number='all' searchResults={searchResults}/>
                </div>
                <div className='column'>
                </div>
            </Layout>
        </>
    );
}