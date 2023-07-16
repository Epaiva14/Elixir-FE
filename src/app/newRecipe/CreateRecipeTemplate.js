'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function CreateRecipeTemplate() {
    const router = useRouter();
	// const [ data, setData ] = useState(null);
	// const [isLoading, setLoading] = useState(true);
	const [redirect, setRedirect] = useState(false);

	// Add parts for recipe
	const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [measures, setMeasures] = useState('');
    const [instructions, setInstructions] = useState('');
    const [alcoholic, setAlcoholic] = useState('');
    const [image, setImage] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [glassType, setGlassType] = useState('');
    const [category, setCategory] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleIngredients = (e) => {
        setIngredients(e.target.value);
    };

    const handleMeasures = (e) => {
        setMeasures(e.target.value);
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

	const handleCreatedBy = (e) => {
        setCreatedBy(e.target.value)
    };

	const handleGlassType = (e) => {
        setGlassType(e.target.value)
    };

	const handleCategory = (e) => {
        setCategory(e.target.value)
    };

	const handleSubmit = (e) => {
		e.preventDefault();

        // let createdBy = req.user.id
        const newRecipe = { 
            name, 
            ingredients, 
            measures, 
            instructions, 
            alcoholic, 
            image, 
            createdBy, 
            glassType, 
            category 
        }
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/recipes/new/`, newRecipe)
            .then(response => {
                console.log('recipe created', response);
                setRedirect(true);
            })
            .catch(error => {
                console.log('===> Error in creation', error)
                router.push('/recipes/')
            });
	}

	if (redirect) {router.push(`/recipes/single/${recipe._id}`)}

	
    return (

    <div className="container box p-6 has-background-light">
      <h2 className="subtitle has-text-centered"> Create a new Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Recipe Name</label>
          <div className="control">
            <input className="input" name="name" value={name} onChange={handleName} type="text" placeholder="Enter your recipe name here" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="instructions">Instructions</label>
          <div className="control">
            <textarea className="textarea" name='instructions' value={instructions} onChange={handleInstructions} placeholder="Instructions here"></textarea>
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="ingredients">Ingredients</label>
          <div className="control">
          <textarea className="textarea" name='ingredients' value={ingredients} onChange={handleIngredients}placeholder="Ingredients here"></textarea>
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="measures">Measures</label>
          <div className="control">
          <textarea className="textarea" name='measures' value={measures} onChange={handleMeasures} placeholder="Measures here"></textarea>
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="image">Image</label>
          <div className="control">
            <input className="input" type="text" name='image' value={image} onChange={handleImage}placeholder="Image url here" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="createdBy">Created By</label>
          <div className="control">
            <input className="input" type="text" name='createdBy' value={createdBy} onChange={handleCreatedBy} placeholder="Created By" />
          </div>
        </div>
  
        <div className="field">
          <label htmlFor="alcoholic">Alcoholic</label>
          <div className="control">
            <div className="select" name='alcholic' value={alcoholic} onChange={handleAlcoholic}>
              <select>
                <option>True</option>
                <option>False</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="glassType">Glass Type</label>
          <div className="control">
            <input className="input" type="text" name='glassType' value={glassType} onChange={handleGlassType} placeholder="Enter your Glass Type" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <div className="control has-icons-left has-icons-right">
            <input className="input" type="text" name='category' value={category} onChange={handleCategory} placeholder="Enter recipe Category" />
          </div>
        </div>
  
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success" type='submit'>Create Recipe</button>
          </div>
          <div className="control">
            <button className="button is-link is-light" type='cancel'>Cancel</button>
          </div>
        </div>
      </form>
    </div>
    )
}