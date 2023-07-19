'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Layout from '../../components/layout';
import RecipeScrollTile from '@/app/components/recipes/recipeScrollTile';

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