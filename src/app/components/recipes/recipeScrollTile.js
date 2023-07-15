'use client'
import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from './recipePreviewContainer';

export default function RecipeScrollTile({ recipes }) {
    return (
        <>
            <main>
                {recipes.map(recipe => {
                    return <RecipePreviewContainer key={recipe._id} recipe={recipe} />
                })}
            </main>
        </>
    )
}