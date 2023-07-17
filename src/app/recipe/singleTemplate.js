'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import '../css/bulma.css';
import '../css/index.css';

export default function SingleTemplate({ recipe }) {
    const router = useRouter();
    const [data, setData] = useState(null);

    const [comments, setComments] = useState(recipe.comments);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);


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
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/search`, { commentIds: comments })
            .then(response => {
                setComments(response.data.comments);
                setCommentsLoading(false);
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
                    <hr />
                </div>
            );
        }
        return rows;
    }

    const handleEdit = () => {
        localStorage.setItem('recipeId', JSON.stringify(recipe._id));
        router.push(`/recipe/edit`);
    }

    if (isLoading || commentsLoading) return <p>Loading ...</p>;
    console.log(recipe);

    return (
        <>
            <main>
                <img className='imageSize' src={recipe.image ? recipe.image : ''} />
                <div className='recipeBox'>
                    <div>{recipe.name}</div>
                    <ul>
                        {renderIngredients()}
                    </ul>
                    <div>{recipe.description}</div>
                    <br />
                </div>
                <div className='recipeCategory'>
                    <div>{recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}</div>
                    <div>{recipe.glassType}</div>
                    <div>{recipe.category}</div>
                </div>

                <div className='createdBy'>

                    <div>
                        Recipe By:
                        <br />
                        {recipe.createdBy.length ? recipe.createdBy[0].username : 'Elixir'}
                    </div>
                </div>

                <div className='descriptionStyle'>{recipe.instructions}</div>
               
                {/* MIKEY HERE - MOVE THIS BUTTON AND DITCH THE DIV WHEN STYLING, ONLY PUT HERE SO I COULD FIND IT AND CLICK ON IT */}
                <div className='createdBy'>
                    {recipe.createdBy.length && data._id === recipe.createdBy[0]._id ? <a className='button' onClick={handleEdit}>Edit</a> : null}
                </div>

            </main>
            <div className='commentStyle'>
                {renderComments()}
            </div>
        </>
    );
}