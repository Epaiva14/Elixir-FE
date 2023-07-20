'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

import RecipePreviewContainer from './recipePreviewContainer';

export default function RecipeScrollTile({ type, number, searchResults }) {
    const [recipes, setRecipes] = useState(null);
    const [recipesLoading, setRecipesLoading] = useState(true);

    let typeClass = 'tile is-ancestor scroll-tile is-responsive' + ' ' + `${type}`;

    useEffect(() => {

        if (type == 'search') {
            setRecipes(searchResults);
            setRecipesLoading(false);
        } else {
            let recipeQuery = `${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/`;
            if (type == 'trending') recipeQuery = recipeQuery.concat(`trending/${number}`);
            if (type == 'my') recipeQuery = recipeQuery.concat(`my`);
            if (type == 'favorite') recipeQuery = recipeQuery.concat(`favorite`);
            axios.get(recipeQuery)

                .then((data) => {
                    setRecipes(data.data.recipes);
                    setRecipesLoading(false);
                });

        }
    }, [number, type, searchResults])


    const renderScrollTile = () => {
        if (recipes) {
            const recipeTiles = recipes.map((recipe) => (
                <RecipePreviewContainer key={recipe._id} recipe={recipe} />
            ));
            const rows = [];
            for (let i = 0; i < recipeTiles.length; i += 2) {
                rows.push(
                    <div key={`row${i}`} className='tile is-parent'>
                        {recipeTiles[i]}
                        {i + 1 < recipeTiles.length ? recipeTiles[i + 1] : null}
                    </div>
                )
            }
            return rows;
        }
    }

    if (recipesLoading) return <p>Loading...</p>;

    return (
        <>
            <div>
                {type === 'favorite' ? <h2 className='title is-1 fav-title'>Favorite Recipes</h2> : null}
                {type === 'trending' ? <h2 className='title is-1 trending-title'>What&apos;s shakin</h2> : null}
                {type === 'my' ? <h2 className='title is-1 my-title'>My Bar</h2> : null}
                {type === 'search' ? <h2 className='title is-1 search-title'>Search Results</h2> : null}
                <div className={typeClass}>
                    <div className='tile is-parent box is-vertical scroll-func'>
                        {renderScrollTile()}
                        {recipes.length < 1 && type === 'my' ? <p className='subtitle remove-item'>Your bar is looking a little empty...</p> : null}
                        {recipes.length < 1 && type === 'search' ? <p className='subtitle remove-item'>No recipes match your query...</p> : null}
                        {recipes.length < 1 && type === 'favorite' ? <p className='subtitle remove-item'>You haven&apos;t added any favorite recipes yet...</p> : null}
                    </div>
                </div>
            </div>
        </>
    )
} 