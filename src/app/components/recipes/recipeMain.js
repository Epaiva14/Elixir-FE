'use client'
import { useEffect, useState } from 'react'
import '../../css/bulma.css';
import '../../css/index.css';
import RecipePreviewContainer from '../recipes/recipePreviewContainer'

export default function RecipeMainComponent() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/recipes')
            .then((res) => res.json())
            .then((data) => {
                console.log('Recipe Data', data.recipes[0]);
                setData(data);
                setLoading(false);

            })
    }, []);


    return (
        <>
            <main>
                <RecipePreviewContainer />
            </main>
            
        </>
    )

}