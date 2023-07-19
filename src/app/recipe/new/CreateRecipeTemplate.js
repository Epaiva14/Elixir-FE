'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';


export default function CreateRecipeTemplate() {
  const paramStyle = {
      color: '#E8BA9E'
  }

  const background = {
    backgroundColor : "#E3E0DE"
  }

  const buttonColor = {
    backgroundColor:"#E8BA9E"
  }
  
  const fontStyle = {
    fontWeight:"700",
    color: 'whitesmoke' ,
    textShadow: "0px 0px 5px #E8BA9E, 0px 0px 5px #E8BA9E"
  }

  const router = useRouter();
	const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
	const [recipeRedirect, setRecipeRedirect] = useState(false);

  const [query, setQuery] = useState('');
  const [selectedParams, setSelectedParams] = useState([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredients, setIngredients] = useState('');

	// Add parts for recipe
	const [name, setName] = useState('');
  const [measures, setMeasures] = useState(['','','','','','']);
  const [instructions, setInstructions] = useState('');
  const [alcoholic, setAlcoholic] = useState('True');
  const [image, setImage] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [glassType, setGlassType] = useState('');
  const [category, setCategory] = useState('');

  const updateIngredientOptions = useCallback((newQuery) => {
    if(newQuery) {
      if(ingredientsLoading) {
          return setIngredientsList(['Loading...']);
      }
      const results = ingredients.filter(ingredient => {
        if (newQuery === '') return true;

        let isAlreadySelected = false;
        selectedParams.forEach(param => {
          if (ingredient._id === param._id) isAlreadySelected = true;
        });
        if (isAlreadySelected) return false;
        
        return ingredient.name.toLowerCase().includes(newQuery.toLowerCase());
      });

      setIngredientsList(results);
    }
  }, [ingredients, selectedParams, ingredientsLoading]);

  if (typeof window !== 'undefined') {
    const expirationTime = new Date(localStorage.getItem('expiration') * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
      handleLogout();
      alert('Session has ended. Please login to continue.');
      router.push('/users/login');
    }
  }

  const addParam = (ingredient) => {
    if(selectedParams.length >= 6) return alert('You can only have 6 ingredients in a recipe.');
    let newParams = [...selectedParams];
    newParams.push(ingredient);
    setSelectedParams(newParams);
    updateIngredientOptions();
  };

  const removeParam = (ingredient) => {
    let newParams = [...selectedParams];
    newParams = newParams.filter(param => {
        return param._id !== ingredient._id;
    });
    setSelectedParams(newParams);
    updateIngredientOptions();
  };

  useEffect(() => {
      setAuthToken(localStorage.getItem('jwtToken'));
      if (localStorage.getItem('jwtToken')) {
          axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
              .then((response) => {
                  let userData = jwtDecode(localStorage.getItem('jwtToken'));
                  if (userData.email === localStorage.getItem('email')) {
                      setData(response.data.users[0]);
                      setLoading(false);
                  } else {
                      router.push('/users/login');
                  }
              })
              .catch((error) => {
                  console.log(error);
                  router.push('/users/login');
              });
      } else {
          router.push('/users/login');
      }
  }, [router]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ingredients`)
    .then((res) => res.json())
    .then((result) => {
        setIngredients(result.ingredients);
        setIngredientsLoading(false);
    });
  }, []);

  useEffect(() => {
    updateIngredientOptions(query);
  }, [selectedParams, query, updateIngredientOptions]);
    
  const handleIngredients = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    updateIngredientOptions(newQuery);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleMeasures1 = (e) => {
    let oldMeasures = [...measures];
    oldMeasures[0] = e.target.value;
    setMeasures(oldMeasures);
  };

  const handleMeasures2 = (e) => { 
    let oldMeasures = [...measures];
    oldMeasures[1] = e.target.value;
    setMeasures(oldMeasures);
  };

  const handleMeasures3 = (e) => {
    let oldMeasures = [...measures];
    oldMeasures[2] = e.target.value;
    setMeasures(oldMeasures);
  };

  const handleMeasures4 = (e) => {
    let oldMeasures = [...measures];
    oldMeasures[3] = e.target.value;
    setMeasures(oldMeasures);
  };

  const handleMeasures5 = (e) => {
    let oldMeasures = [...measures];
    oldMeasures[4] = e.target.value;
    setMeasures(oldMeasures);
  };

  const handleMeasures6 = (e) => {
    let oldMeasures = [...measures];
    oldMeasures[5] = e.target.value;
    setMeasures(oldMeasures);
  };

  const handleInstructions = (e) => {
    setInstructions(e.target.value);
  };

  const handleAlcoholic = (e) => {
    setAlcoholic(e.target.value);
  };

	const handleImage = (e) => {
    setImage(e.target.value)
  };

	const handleGlassType = (e) => {
    setGlassType(e.target.value)
  };

	const handleCategory = (e) => {
    setCategory(e.target.value)
  };

	const handleSubmit = (e) => {
		e.preventDefault();

    let ingredients = [];
    selectedParams.forEach(param => {
      ingredients.push(param._id);
    });

    const newRecipe = {
        name,
        ingredients,
        measures, 
        instructions, 
        alcoholic,
        image,
        glassType,
        category 
    }

    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/new`, newRecipe)
    .then(response => {
      setRecipeRedirect(response.data.recipe._id);
    })
    .catch(error => {
      console.log('===> Error in creation', error)
      router.push('/recipe/new')
    });
	};

  const renderIngredients = () => {
      let rows = [];
      for (let i = 0; i < 10 && i < ingredientsList.length; i++) {
          rows.push(<li className='recipe-search-item' key={ingredientsList[i]._id} onClick={() => {
              addParam(ingredientsList[i]);
              updateIngredientOptions();
          }}>{ingredientsList[i].name}</li>);
      }
      return rows;
  }

	if (recipeRedirect) {
    localStorage.setItem('recipeId', JSON.stringify(recipeRedirect));
    router.push(`/recipe`);
  }

	
    return (
      <>
    <div className='column'></div>
    <div className='column is-three-fifths'>
      <h1 className="title has-text-centered" style={fontStyle}>Share Your Recipe</h1>
      <div className="container box p-6 shadow rounded content" style={background}>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Recipe Name</label>
          <div className="control">
            <input className="input" name="name" value={name} onChange={handleName} type="text" placeholder="Recipe Name" required />
          </div>
        </div>
        

        <div className="field">
          <label htmlFor="instructions">Instructions</label>
          <div className="control">
            <textarea className="textarea" name='instructions' value={instructions} onChange={handleInstructions} placeholder="Instructions" />
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="image">Image</label>
          <div className="control">
            <input className="input" type="text" name='image' value={image} onChange={handleImage}placeholder="Image URL" />
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="alcoholic">Alcoholic</label>
          <div className="control">
            <div className="select">
              <select name='alcholic' value={alcoholic} onChange={handleAlcoholic}>
                <option>True</option>
                <option>False</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="glassType">Glass Type</label>
          <div className="control">
            <input className="input" type="text" name='glassType' value={glassType} onChange={handleGlassType} placeholder="Glass Type" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <div className="control">
            <input className="input" type="text" name='category' value={category} onChange={handleCategory} placeholder="Recipe Category" />
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="ingredients">Ingredients (max 6)</label>
          <div className="control">
          <input className="input" type="search" name='ingredients' onChange={handleIngredients} placeholder="Search and Add Ingredients" />
          </div>
        </div>

        <ul style={paramStyle}>
            {(selectedParams === '' ? '' : selectedParams.map(param => {
                return <li className='recipe-search-item' key={param._id}>{param.name} <span className='remove-item' onClick={() => {
                    removeParam(param);
                    updateIngredientOptions();
                }}>X</span></li>
            }))}
        </ul>
        <ul>
            {(query === '' ? '' : ingredientsList[0] === 'Loading...' ? <li key='loading'>Ingredients Loading...</li> : renderIngredients())}
        </ul>

        <div className="field">
          <label htmlFor="measures1">Measure 1</label>
          <div className="control">
            <input className="input" name='measures1' value={measures[0]} onChange={handleMeasures1} placeholder="Ingredient 1 Measure" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="measures2">Measure 2</label>
          <div className="control">
            <input className="input" name='measures2' value={measures[1]} onChange={handleMeasures2} placeholder="Ingredient 2 Measure" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="measures3">Measure 3</label>
          <div className="control">
            <input className="input" name='measures3' value={measures[2]} onChange={handleMeasures3} placeholder="Ingredient 3 Measure" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="measures4">Measure 4</label>
          <div className="control">
            <input className="input" name='measures4' value={measures[3]} onChange={handleMeasures4} placeholder="Ingredient 4 Measure" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="measures5">Measure 5</label>
          <div className="control">
            <input className="input" name='measures5' value={measures[4]} onChange={handleMeasures5} placeholder="Ingredient 5 Measure" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="measures6">Measure 6</label>
          <div className="control">
            <input className="input" name='measures6' value={measures[5]} onChange={handleMeasures6} placeholder="Ingredient 6 Measure" />
          </div>
        </div>
  
        <div className="field">
          <div className="control">
            <button className="button is-success" type='submit' style={buttonColor}>Create Recipe</button>
          </div>
        </div>
      </form>
      </div>
    </div>
    <div className='column'></div>
    </>
    )
}