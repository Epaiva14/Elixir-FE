'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from './recipePreviewContainer';

export default function RecipeScrollTile({ type, number, id, searchResults }) {
    const [recipes, setRecipes] = useState(null);
    const [recipesLoading, setRecipesLoading] = useState(true);

    let myTile = document.getElementsByClassName('scroll-tile');

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

          {type === 'favorite' ? <h2 className='title is-1'>Favorite Recipes</h2> : null}
            {type === 'trending' ? <h2 className='title is-1 trending-title'>What&apos;s shakin</h2> : null}
            {type === 'my' ? <h2 className='title is-1 my-title'>My Bar</h2> : null}
            {type === 'search' ? <h2 className='title is-1 search-title'>Search Results</h2> : null}

                <div className='tile is-ancestor scroll-tile is-responsive'>
                    <div className='tile is-parent box is-vertical scroll-func'>



                        {renderScrollTile()}
                        {!recipes && type === 'my' ? <p className='subtitle'>Your bar is looking a little empty...</p> : null}
                    </div>
                </div>
            </div>
        </>
    )
} 