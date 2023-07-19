'use client';

import Layout from '@/app/components/layout';
import RecipeScrollTile from '@/app/components/recipes/recipeScrollTile';

export default function SearchResults() {
    let searchResults;

    if (typeof window !== 'undefined') {
        searchResults = JSON.parse(localStorage.getItem('searchResults'));
    }

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