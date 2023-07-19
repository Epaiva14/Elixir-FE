'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipePreviewContainer({ recipe }) {
    const router = useRouter();
    const [recipeRedirect, setRecipeRedirect] = useState(false);
    
    useEffect(() => {
        if (recipeRedirect) {
            localStorage.setItem('recipeId', JSON.stringify(recipeRedirect));
            router.push('/recipe');
        }
    }, [recipeRedirect, router]);

    const getGlassType = (recipe) => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        let glassTypePrefix = '';

        // to lower case glass type + creating preview text 
        let recipeGlassType = recipe.glassType.toLowerCase();

        if (recipeGlassType[0].includes(vowels) === true) {
            glassTypePrefix = 'in an';
        } else {
            glassTypePrefix = 'in a';
        }
        return glassTypePrefix + ' ' + recipeGlassType;
    }

    const ingredients = [];
    for (let i = 0; i < 3; i++) {
        if (i < recipe.ingredients.length) {
            ingredients.push(`${i + 1}. ${recipe.ingredients[i].name}`);
            ingredients.push(<br />);
        }
    }

    return (
        <>
            <div className='tile is-child' onClick={() => setRecipeRedirect(recipe._id)}>
                <div className="card recipe-style">
                        <div className="card-image">
                            <figure className="image is-4by3">
                            {recipe.image ? <img src={recipe.image} alt="drink image" /> : <img src='https://i.imgur.com/xkynjld.png' alt='placeholder image'/>}
                            </figure>
                        </div>
                    <div className='recipe-on-hover'>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{recipe.name}</p>
                                    <p className="subtitle is-6">{recipe.createdBy.length ? recipe.createdBy[0].username : 'Elixir'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="overlay">
                            <div className="content1">
                                <h1 className='overlay-text-heading'>{recipe.category}</h1>
                                <em><h2>{recipe.glassType ? getGlassType(recipe) : null}</h2></em>
                                <hr className='recipe-row'/>
                                <p className='ingredient-list'>
                                    {ingredients}
                                    <span className='read-more'>...read more</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}