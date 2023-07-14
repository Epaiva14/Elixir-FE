'use client'
import { useEffect, useState } from 'react'
import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from './recipePreviewContainer'
import axios from 'axios';

export default function RecipeScrollTile() {
    const [data, setData] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/recipes')
            .then((res) => res.json())
            .then((data) => {
                console.log('Recipe Data', data.recipes);
                setData(data.recipes);
                setLoading(false);
            })
    }, []);

    if (isLoading) return <p>Loading...</p>;

    console.log('Recipe Data Outside use effect', data[1])

    return (
        <>
            <main>
                <RecipePreviewContainer recipes={data} />
            </main>
            
        </>
    )

}