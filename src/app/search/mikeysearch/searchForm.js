'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Search() {
    const resultStyle = {
        color: 'orange'
    }

    const paramStyle = {
        color: 'green'
    }

    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [query, setQuery] = useState('');
    const [list, setList] = useState([]);
    const [ingredients, setIngredients] = useState();
    const [selectedParams, setSelectedParams] = useState([]);
    const [searchResults, setSearchResults] = useState();
    
    const handleChange = (e) => {
        const results = ingredients.filter(ingredient => {
            if (e.target.value === '') return true;

            let isAlreadySelected = false;
            selectedParams.forEach(param => {
                if (ingredient._id === param._id) isAlreadySelected = true;
            });
            if (isAlreadySelected) return false;
            
            return ingredient.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setQuery(e.target.value);
        setList(results);
    }

    const addParam = (ingredient) => {
        let newParams = [...selectedParams];
        newParams.push(ingredient);
        setSelectedParams(newParams);
    }

    const removeParam = (ingredient) => {
        let newParams = [...selectedParams];
        newParams = newParams.filter(param => {
            return param._id !== ingredient._id;
        });
        setSelectedParams(newParams);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/search`, { selectedParams })
        .then(response => {
            setSearchResults(response.data);
            setRedirect(true);
        })
        .catch(err => {
            setError(true);
        })
    }
    
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ingredients`)
        .then((res) => res.json())
        .then((result) => {
            setIngredients(result.ingredients);
            setIsLoading(false);
        });
    }, []);

    // if (redirect) {
    //     router.push({
    //         path: '/search/mikeysearch/results',
    //         state: { searchResults: searchResults }
    //     });
    // }
    if (error) {
        return (
            <>
                <h1>Error</h1>
                <Link href="/search/mikeysearch">Search Again</Link>
            </>
        );
    }
    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="search" value={query} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
            <ul>
                {(selectedParams === '' ? '' : selectedParams.map(param => {
                    return <li style={paramStyle} key={param._id}>{param.name} <a onClick={() => {removeParam(param)}}>X</a></li>
                }))}
            </ul>
            <ul>
                {(query === '' ? '' : list.map(ingredient => {
                    return <li onClick={() => {addParam(ingredient)}} key={ingredient._id}>{ingredient.name}</li>
                }))}
            </ul>
            {!searchResults ? '' : searchResults.recipes.map(recipe => {
                return <div style={resultStyle} key={recipe._id}>{recipe.name}</div>
            })}
        </>
    );
}