'use client';
import '../css/bulma.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SingleTemplate({recipe}) {
    const [comments, setComments] = useState(recipe.comments);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/search`, { commentIds: comments })
        .then(response => {
            setComments(response.data.comments);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [comments]);

    const renderIngredients = () => {
        const rows = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
            rows.push(
                <li key={recipe.ingredients[i]._id}>
                    {recipe.measures[i]} {recipe.ingredients[i].name}
                </li>
            );
        }
        return rows;
    }

    const renderComments = () => {
        const rows = [];
        for (let i = 0; i < comments.length; i++) {
            rows.push(
                <div key={comments[i]._id}>
                    <h2 key={comments[i].title}>{comments[i].createdBy ? comments[i].createdBy[0].username : null} - {comments[i].title}</h2>
                    <p key={comments[i].body}>{comments[i].body}</p>
                </div>
            );
        }
        return rows;
    }

    if (isLoading) return <p>Loading ...</p>;

    return (
        <>
            <div>{recipe.name}</div>
            <div>{recipe.createdBy.length ? recipe.createdBy[0].username : 'Elixir'}</div>
            <ul>
                {renderIngredients()}
            </ul>
            <div>{recipe.instructions}</div>
            <div>{recipe.description}</div>
            <div>{recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}</div>
            <div><img src={recipe.image ? recipe.image : ''} /></div>
            <div>{recipe.glassType}</div>
            <div>{recipe.category}</div>
            <div>
                {renderComments()}
            </div>
        </>
    );
}