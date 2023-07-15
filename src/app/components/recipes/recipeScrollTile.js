'use client'
import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from './recipePreviewContainer';

export default function RecipeScrollTile({ recipes }) {

    function twoByTwo(recipes) {
        

    }

    return (
        <>
            <main>
                <div className='tile is-ancestor is-4 scroll-tile'>
                    <div className='tile is-parent box is-vertical'>
                        <div className='tile is-parent'>

                            {recipes.map(recipe => {
                                return <RecipePreviewContainer key={recipe._id} recipe={recipe} />
                            })}

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
} 