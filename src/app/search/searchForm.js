'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

import './search.css';

export default function Search() {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedParams, setSelectedParams] = useState([]);
    const [searchResults, setSearchResults] = useState();

    const [searchRedirect, setSearchRedirect] = useState(false);
    const [recipeRedirect, setRecipeRedirect] = useState(false);
    // const [userRedirect, setUserRedirect] = useState(false);

    const [recipesLoading, setRecipesLoading] = useState(true);
    const [ingredientsLoading, setIngredientsLoading] = useState(true);
    // const [usersLoading, setUsersLoading] = useState(true);

    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipesList, setRecipesList] = useState([]);
    // const [usersList, setUsersList] = useState([]);

    const [ingredients, setIngredients] = useState();
    const [recipes, setRecipes] = useState();
    // const [users, setUsers] = useState();

    const updateIngredientOptions = useCallback((newQuery) => {
        if (newQuery) {
            if (ingredientsLoading) {
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

    const updateRecipeOptions = useCallback((newQuery) => {
        if (newQuery) {
            if (recipesLoading) {
                return setRecipesList(['Loading...']);
            }
            const results = recipes.filter(recipe => {
                if (newQuery === '') return true;
                return recipe.name.toLowerCase().includes(newQuery.toLowerCase());
            });

            setRecipesList(results);
        }
    }, [recipes, recipesLoading]);

    // const updateUserOptions = useCallback((newQuery) => {
    //     if (newQuery) {
    //         if (usersLoading) {
    //             return setUsersList(['Loading...']);
    //         }
    //         const results = users.filter(user => {
    //             if (newQuery === '') return true;
    //             return user.username.toLowerCase().includes(newQuery.toLowerCase());
    //         });

    //         setUsersList(results);
    //     }
    // }, [users, usersLoading]);

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        updateIngredientOptions(newQuery);
        updateRecipeOptions(newQuery);
        // updateUserOptions(newQuery);
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
            router.push('/recipe');
        }

        // if (userRedirect) {
        //     localStorage.setItem('userId', JSON.stringify(userRedirect));
        //     router.push('/user');
        // }
        // }, [router, searchResults, searchRedirect, recipeRedirect, userRedirect]);
    }, [router, searchResults, searchRedirect, recipeRedirect]);

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

    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`)
    //         .then((res) => res.json())
    //         .then((result) => {
    //             setUsers(result.users);
    //             setUsersLoading(false);
    //         });
    // }, []);

    useEffect(() => {
        updateIngredientOptions(query);
        updateRecipeOptions(query);
        // updateUserOptions(query);
        // }, [selectedParams, query, updateIngredientOptions, updateRecipeOptions, updateUserOptions]);
    }, [selectedParams, query, updateIngredientOptions, updateRecipeOptions]);


    if (error) {
        return (
            <>
                <h1>Error</h1>
                <Link href="/search">Search Again</Link>
            </>
        );
    }

    const renderIngredients = () => {
        let rows = [];
        for (let i = 0; i < 5 && i < ingredientsList.length; i++) {
            rows.push(<li className='search-item' key={ingredientsList[i]._id} onClick={() => {
                addParam(ingredientsList[i]);
                updateIngredientOptions();
            }}>{ingredientsList[i].name}</li>);
        }
        return rows;
    }

    const renderRecipes = () => {
        let rows = [];
        for (let i = 0; i < 5 && i < recipesList.length; i++) {
            rows.push(<li className='search-item' key={recipesList[i]._id} onClick={() => {
                setRecipeRedirect(recipesList[i]._id);
            }}>{recipesList[i].name}</li>);
        }
        return rows;
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div class="field has-addons search-bar">
                        <div class="control is-expanded">
                            <span><h2 className='title search-title'>Search for a drink</h2></span>
                            <input className="input is-rounded is-large " type="search" value={query} onChange={handleChange} />
                        </div>
                        <div class="control">
                            <a class="button search-btn is-rounded is-large" onClick={handleSubmit}>
                                Search
                            </a>
                        </div>
                    </div>
                </form>


                <div className="results-container">
                    <div className='ul-div'>
                        <ul style={paramStyle}>
                            {(selectedParams === '' ? '' : selectedParams.map(param => {
                                return <li className='search-item' key={param._id}>{param.name} <a className='remove-item' onClick={() => {
                                    removeParam(param);
                                    updateIngredientOptions();
                                }}>X</a></li>
                            }))}
                        </ul>
                    </div>
                    <div className='ul-div'>
                        <ul style={ingredientStyle}>
                            {(query ? <li className='search-item subtitle mb-0 paramStyle'>Ingredients</li> : null)}
                            {(query === '' ? '' : ingredientsList[0] === 'Loading...' ? <li key='loading'>Ingredients Loading...</li> : renderIngredients())}
                        </ul>
                   
                   
                        <ul style={recipeStyle}>
                            {(query ? <li className='search-item subtitle mb-0 paramStyle'>Recipes</li> : null)}
                            {(query === '' ? '' : recipesList[0] === 'Loading...' ? <li key='loading'>Recipes Loading...</li> : renderRecipes())}
                        </ul>
                    </div>
                </div>
                {/* <ul style={userStyle}>
                    {(query === '' ? '' : usersList.map(user => {
                        return (user === 'Loading...') ? <li key='loading'>Users Loading...</li> : <li key={user._id} onClick={() => {
                            setUserRedirect(user._id);
                        }}>{user.username}</li>
                    }))}
                </ul> */}
            </div>
        </>
    );
}