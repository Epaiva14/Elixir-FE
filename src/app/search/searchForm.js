'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Search() {
    const paramStyle = {
        color: 'green'
    }

    const ingredientStyle = {
        color: 'blue'
    }

    const recipeStyle = {
        color: 'red'
    }

    const userStyle = {
        color: 'purple'
    }

    const router = useRouter();
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedParams, setSelectedParams] = useState([]);
    const [searchResults, setSearchResults] = useState();

    const [searchRedirect, setSearchRedirect] = useState(false);
    const [recipeRedirect, setRecipeRedirect] = useState(false);
    const [userRedirect, setUserRedirect] = useState(false);
    
    const [recipesLoading, setRecipesLoading] = useState(true);
    const [ingredientsLoading, setIngredientsLoading] = useState(true);
    const [usersLoading, setUsersLoading] = useState(true);

    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipesList, setRecipesList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    
    const [ingredients, setIngredients] = useState();
    const [recipes, setRecipes] = useState();
    const [users, setUsers] = useState();

    const updateIngredientOptions = () => {
        if(ingredientsLoading) {
            return setIngredientsList(['Loading...']);
        }
        const results = ingredients.filter(ingredient => {
            if (query === '') return true;

            let isAlreadySelected = false;
            selectedParams.forEach(param => {
                if (ingredient._id === param._id) isAlreadySelected = true;
            });
            if (isAlreadySelected) return false;
            
            return ingredient.name.toLowerCase().includes(query.toLowerCase());
        });

        setIngredientsList(results);
    }

    const updateRecipeOptions = () => {
        if(recipesLoading) {
            return setRecipesList(['Loading...']);
        }
        const results = recipes.filter(recipe => {
            if (query === '') return true;
            return recipe.name.toLowerCase().includes(query.toLowerCase());
        });

        setRecipesList(results);
    }

    const updateUserOptions = () => {
        if(usersLoading) {
            return setUsersList(['Loading...']);
        }
        const results = users.filter(user => {
            if (query === '') return true;
            return user.username.toLowerCase().includes(query.toLowerCase());
        });

        setUsersList(results);
    }
    
    const handleChange = (e) => {
        setQuery(e.target.value);
        updateIngredientOptions();
        updateRecipeOptions();
        updateUserOptions();
    }

    const addParam = (ingredient) => {
        let newParams = [...selectedParams];
        newParams.push(ingredient);
        setSelectedParams(newParams);
        updateIngredientOptions();
    }

    const removeParam = (ingredient) => {
        let newParams = [...selectedParams];
        newParams = newParams.filter(param => {
            return param._id !== ingredient._id;
        });
        setSelectedParams(newParams);
        updateIngredientOptions();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/search`, { selectedParams })
        .then(response => {
            setSearchResults(response.data);
            setSearchRedirect(true);
        })
        .catch(err => {
            setError(true);
        })
    }

    useEffect(() => {
        if (searchRedirect) {
            localStorage.setItem('searchResults', JSON.stringify(searchResults.recipes));
            router.push('/search/results');
        }

        if (recipeRedirect) {
            localStorage.setItem('recipeId', JSON.stringify(recipeRedirect));
            router.push('/single/recipe');
        }

        if (userRedirect) {
            localStorage.setItem('userId', JSON.stringify(userRedirect));
            router.push('/single/user');
        }
    }, [router, searchResults, searchRedirect, recipeRedirect, userRedirect]);
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ingredients`)
        .then((res) => res.json())
        .then((result) => {
            setIngredients(result.ingredients);
            setIngredientsLoading(false);
        });
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes`)
        .then((res) => res.json())
        .then((result) => {
            setRecipes(result.recipes);
            setRecipesLoading(false);
        });
    }, []);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
        .then((res) => res.json())
        .then((result) => {
            setUsers(result.users);
            setUsersLoading(false);
        });
    }, []);

    
    if (error) {
        return (
            <>
                <h1>Error</h1>
                <Link href="/search">Search Again</Link>
            </>
        );
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="search" value={query} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <ul style={paramStyle}>
                {(selectedParams === '' ? '' : selectedParams.map(param => {
                    return <li key={param._id}>{param.name} <a onClick={() => {
                        removeParam(param);
                        updateIngredientOptions();
                    }}>X</a></li>
                }))}
            </ul>
            <ul style={ingredientStyle}>
                {(query === '' ? '' : ingredientsList.map(ingredient => {
                    return (ingredient === 'Loading...') ? <li key='loading'>Ingredients Loading...</li> : <li key={ingredient._id} onClick={() => {
                        addParam(ingredient);
                        updateIngredientOptions();
                    }}>{ingredient.name}</li>
                }))}
            </ul>
            <ul style={recipeStyle}>
                {( query === '' ? '' : recipesList.map(recipe => {
                    return (recipe === 'Loading...') ? <li key='loading'>Recipes Loading...</li> : <li key={recipe._id} onClick={() => {
                        setRecipeRedirect(recipe._id);
                    }}>{recipe.name}</li>
                }))}
            </ul>
            <ul style={userStyle}>
                {( query === '' ? '' : usersList.map(user => {
                    return (user === 'Loading...') ? <li key='loading'>Users Loading...</li> : <li key={user._id} onClick={() => {
                        setUserRedirect(user._id);
                    }}>{user.username}</li>
                }))}
            </ul>
        </>
    );
}