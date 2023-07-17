'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from './recipePreviewContainer';

export default function RecipeScrollTile({ type, number }) {
    const [recipes, setRecipes] = useState(null);
    const [recipesLoading, setRecipesLoading] = useState(true);
    
    useEffect(() => {
        let recipeQuery = `${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/`;
        if (type == 'trending') recipeQuery = recipeQuery.concat(`trending/${number}`);
        if (type == 'my') recipeQuery = recipeQuery.concat(`my`);
        if (type == 'favorite') recipeQuery = recipeQuery.concat(`favorite`);
        axios.get(recipeQuery)
        .then((data) => {
            setRecipes(data.data.recipes);
            setRecipesLoading(false);
        });
    }, [number, type])

    
    const renderScrollTile = () => {
        if(recipes) {
            const recipeTiles = recipes.map((recipe, i) => (
                <RecipePreviewContainer key={recipe._id} recipe={recipe} />
            ));
            const rows = [];
            for (let i = 0; i < recipeTiles.length; i += 2) {
                rows.push(
                    <div className='tile is-parent'>
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
            <div className={type}>
                <div className='tile is-ancestor is-4 scroll-tile is-responsive'>
                    <div className='tile is-parent box is-vertical scroll-func'>
                        {type === 'favorite' ? <h2 className='title is-1'>Favorite Recipes</h2> : null}
                        {type === 'trending' ? <h2 className='title is-1'>Trending Recipes</h2> : null}
                        {type === 'my' ? <h2 className='title is-1'>My Recipes</h2> : null}
                        {renderScrollTile()}
                    </div>
                </div>
            </div>
        </>
    )
} 