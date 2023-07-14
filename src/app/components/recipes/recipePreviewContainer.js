'use client'
import '../../css/bulma.css';
import '../../css/index.css';


export default function RecipePreviewContainer({ recipes }) {
    //declaring variables
    const vowels = ['a', 'e', 'i', 'o', 'u']
    let glassTypePrefix 
    const recipe = recipes[0];

    //to lower case glass type + creating preview text 
    const recipeGlassType = recipe.glassType.toLowerCase();

    if (recipeGlassType[0].includes(vowels) === true) {
        glassTypePrefix = 'in an'
    } else {
        glassTypePrefix = 'in a'
    }
    const recipeGlassTypeText = glassTypePrefix + ' ' + recipeGlassType; 

    //setting created by 
    if (recipe.createdBy.length === 0) {

        recipe.createdBy = 'Elixir'

    }


    const ingredients = [];
    for (let i = 0; i < 4; i++) {

        ingredients.push(recipe.ingredients[i].name);

    }
  
    console.log('Ingredients?', ingredients)
    // 

    return (
        <>  
            <a href='/recipes'>
            <div className='card-hover'>
            <div className="card recipe-style">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={recipe.image} alt="Placeholder image" />
                    </figure>
                </div>
                <div className='recipe-on-hover'>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{recipe.name}</p>
                            <p className="subtitle is-6">{recipe.createdBy}</p>
                        </div>
                    </div>
                </div>
                    <div className="overlay">
                        <div className="content1">
                            <h1 className='overlay-text-heading'>{recipe.category}</h1>
                            <em><h2>{recipeGlassTypeText}</h2></em>
                            <hr />
                            <p>
                               1. {ingredients[0]}
                               <br />
                               2. {ingredients[1]}
                               <br />
                               3. {ingredients[2]}
                               <br />
                               4. {ingredients[3]}
                               <br />
                               <div className='read-more'>...read more</div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </a>
        </>
    )

}