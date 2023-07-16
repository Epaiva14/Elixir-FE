'use client'
import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from './recipePreviewContainer';

export default function RecipeScrollTile({ recipes }) {

    // const recipeTiles = [];
    // const divHead = <div className="tile is-parent">;
    // const divTail = </div>);
    // for(let i = 0; i < recipes.length; i++) {
    //     if(i % 2 === 0) {
    //         recipeTiles.push(divHead);
    //     }
        
    //     recipeTiles.push(<RecipePreviewContainer key={recipes[i]._id} recipe={recipes[i]} />);
        
    //     if(i % 2 === 1) {
    //         recipeTiles.push(divTail);
    //     }
    // }

    const recipeTiles = recipes.map((recipe, i) => (
        <RecipePreviewContainer key={recipe._id} recipe={recipe} />
    ));

    const renderScrollTile = () => {
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

    return (
        <>
            <main>
                <div className='tile is-ancestor is-4 scroll-tile is-responsive'>
                    <div className='tile is-parent box is-vertical scroll-func'>
                        {renderScrollTile()}
                    </div>
                </div>
            </main>
        </>
    )
} 