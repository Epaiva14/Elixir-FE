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

    const [commentBody, setCommentBody] = useState('');
    const [editingComment, setEditingComment] = useState(false);


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
    }, []);

    const handleChange = (e) => {
        setCommentBody(e.target.value);
    }

    const handleComment = (e) => {
        e.preventDefault();
        if (commentBody) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipe._id}/comment`, { body: commentBody })
                .then(response => {
                    setComments([...comments, response.data.comment]);
                    setCommentBody('');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const presentEditCommentForm = (commentId) => {
        setEditingComment(commentId);
        setCommentBody(comments.filter(comment => comment._id === commentId)[0].body);
    }

    const handleEditComment = (e) => {
        e.preventDefault();
        if (commentBody) {
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${editingComment}`, { body: commentBody })
                .then(response => {
                    setComments(comments.map(comment => {
                        if (comment._id === editingComment) {
                            comment.body = commentBody;
                        }
                        return comment;
                    }));
                    setCommentBody('');
                    setEditingComment(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const cancelEditComment = () => {
        setEditingComment(false);
        setCommentBody('');
    }

    const handleDeleteComment = (commentId) => {
        axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`)
            .then(response => {
                if (response) {
                    setComments(comments.filter(comment => comment._id !== commentId));
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const renderIngredients = () => {
        const rows = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
            rows.push(

                <li key={recipe.ingredients[i]._id}>
                    <strong>{recipe.measures[i]}</strong> {recipe.ingredients[i].name}
                </li>

            );
        }
        return rows;
    }

    const renderComments = () => {
        const rows = [];
        for (let i = 0; i < comments.length; i++) {
            rows.push(
                <article class="media comment-style card-content">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                    <div key={comments[i]._id} className='media-content card'>
                        <div className='content card-content'>
                            <h2 key={comments[i].title}>{comments[i].createdBy ? comments[i].createdBy[0].username : null} - {comments[i].title}</h2>
                            <p key={comments[i].body}>{comments[i].body}</p>
                            {data._id === comments[i].createdBy[0]._id ? <a className='button login-btn' onClick={() => presentEditCommentForm(comments[i]._id)}>Edit</a> : null}
                            {data._id === comments[i].createdBy[0]._id ? <a className='button signup-btn' onClick={() => handleDeleteComment(comments[i]._id)}>Delete</a> : null}
                        </div>
                    </div>
                </article>
            );
        }
        return rows;
    }

    const renderAddCommentForm = () => {
        return (
            <article class="media card-content">
                <form onSubmit={handleComment}>
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div className='field'>
                            <div className='control'>
                                <textarea className='textarea' name='body' value={commentBody} placeholder='Leave a Comment' onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <button className='button login-btn' type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
            </article>
        );
    }

    const renderEditCommentForm = () => {
        return (
            <form onSubmit={handleEditComment}>
                <div className='field'>
                    <div className='control'>
                        <textarea className='textarea' name='body' value={commentBody} placeholder='Leave a Comment' onChange={handleChange} />
                    </div>
                </div>
                <div className='is-grouped field'>
                    <div className='control'>
                        <button className='button is-link' type='submit'>Submit</button>
                    </div>
                    <div className='control'>
                        <button className='button is-link' type='cancel' onClick={cancelEditComment}>Cancel</button>
                    </div>
                </div>
            </form>
        );
    }

    const handleEdit = () => {
        localStorage.setItem('recipeId', JSON.stringify(recipe._id));
        router.push(`/recipe/edit`);
    }

    const checkFavorite = () => {
        let userFavorites = data.favorites.map(favorite => favorite.toString());
        return userFavorites.includes(recipe._id.toString());
    }

    const handleAddFavorite = () => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipe._id}/favorite`)
            .then(result => {
                data.favorites = result.data.user.favorites;
            })
            .catch(err => console.log(err));
    }

    const handleRemoveFavorite = () => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipes/${recipe._id}/unfavorite`)
            .then(result => {
                data.favorites = result.data.user.favorites;
            })
            .catch(err => console.log(err));
    }

    const renderRemoveFavoriteButton = () => {
        return (
            <a className='button card-footer-item login-btn' onClick={handleRemoveFavorite}>Favorite -</a>
        );
    }

    const renderAddFavoriteButton = () => {
        return (
            <a className='button card-footer-item login-btn' onClick={handleAddFavorite}>Favorite +</a>
        );
    }

    const renderInstructions = () => {
        if (!recipe.instructions) {
            return (
                <div className='card-content'>
                    <p>There are no instructions for this drink</p>
                </div>

            )

        } else {
            return (
                <div className='card-content'>
                    <p>{recipe.instructions}</p>
                </div>
            )

        }


    }

    if (isLoading || commentsLoading) return <p>Loading ...</p>;

    return (
        <>



            <div className='column is-two-fifths'>
                <div className='card comment-container'>
                    <div className='card-content'>
                        <h2 className='title is-2 recipe-name'>{recipe.name}</h2>
                        <h3 className='subtitle is-3 recipe-name'><em>From {recipe.createdBy.length ? recipe.createdBy[0].username : 'Elixir'}</em></h3>
                        <div className='card '>
                            <div className='card-content image-card'>
                                <img className='image imageSize' src={recipe.image ? recipe.image : 'https://i.imgur.com/xkynjld.png'} />
                            </div>
                        </div>
                    </div>
                    <footer class="card-footer">
                        {checkFavorite() ? renderRemoveFavoriteButton() : renderAddFavoriteButton()}
                        {recipe.createdBy.length && data._id === recipe.createdBy[0]._id ? <a className='button card-footer-item signup-btn' onClick={handleEdit}>Edit</a> : null}
                    </footer>
                </div>
            </div>

            <div className='column is-vcentered is-two-fifths details-div'>
                <div className='card comment-container'>
                    <div className='card-content'>
                        <div>
                            <p className='recipe-types'>{recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'} {recipe.category} In A {recipe.glassType}</p>
                        </div>
                        <br />
                        <div className='card'>
                            <div className='card-content'>
                                <ul>
                                    {renderIngredients()}
                                </ul>
                            </div>
                        </div>
                        <div>{recipe.description}</div>

                        <br />

                    </div>
                </div>

                <div className='columns is-multiline'>
                    <div className='column'>
                        <div className='card comment-container'>
                            <div className='card-content'>
                                <h2 className='title is-5'>Instructions</h2>
                                <div className='card'>
                                <div className='card-content'>
                                {renderInstructions()}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='column is-full'>
                <div className="comment-container card">
                    {/* MIKEY HERE - MOVE THIS FORM SOMEWHERE ELSE AND GET RID OF commentStyle CLASS AT SOME POINT - I PUT IT HERE SO I COULD SEE IT AND USE IT WHILE DEVELOPING */}
                    <div className='card-content'>
                        {renderComments()}

                        {editingComment ? renderEditCommentForm() : renderAddCommentForm()}
                    </div>
                </div>
            </div>


        </>
    );
}