'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import setAuthToken from '@/app/utils/setAuthToken';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';

import genericAvatar from '@/app/assets/avatar.png';

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

        if (currentTime >= expirationTime) {
            handleLogout();
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

    const checkDescription = (ingredient, measure) => {
        if (!ingredient.description) {
            return (
                <li className='ingredient-hover' key={ingredient._id}>
                <strong>{measure}</strong> { ingredient.name }
                </li>
            )
        } else {
            return (
            <li className='ingredient-hover' key={ingredient._id}>
                    <strong>{measure}</strong> <u>{ingredient.name}</u>
            <div className='ingredient-hover-content card'>
                <div className='card-content'>
                    <p className='ingredient-hover-text'>{ingredient.description}</p>
                </div>
            </div>
            </li>
            )
        }
    }

    const renderIngredients = () => {
        const rows = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
            let ingredient = recipe.ingredients[i];
            let measure = recipe.measures[i];
            rows.push(
                <div key={`ingdiv${i}`}className='ingredient-div'>
                <ul >
                    {checkDescription(ingredient, measure)}
                </ul>
                </div>
            );
        }
        return rows;
    }

    const renderComments = () => {
        const rows = [];
        for (let i = 0; i < comments.length; i++) {
            rows.push(
                <article key={`article${i}`} className="media comment-style card-content ">
                    <figure key={`figure${i}`} className="media-left">
                        <p key={`p1${i}`} className="image is-64x64">
                            <img key={`img${i}`} src={comments[i].createdBy[0].avatar ? comments[i].createdBy[0].avatar : genericAvatar.src} />
                        </p>
                    </figure>
                    <div key={comments[i]._id} className='media-content card'>
                        <div key={`div1${i}`} className='content card-content comment-content-container'>
                            <h2 key={comments[i].createdBy[0]._id}>{comments[i].createdBy ? comments[i].createdBy[0].username : null}</h2>
                            <p key={comments[i].body}>{comments[i].body}</p>
                            {data._id === comments[i].createdBy[0]._id ? <a key={`edit${i}`} className='button login-btn' onClick={() => presentEditCommentForm(comments[i]._id)}>Edit</a> : null}
                            {data._id === comments[i].createdBy[0]._id ? <a key={`delete${i}`} className='button signup-btn' onClick={() => handleDeleteComment(comments[i]._id)}>Delete</a> : null}
                        </div>
                    </div>
                </article>
            );
        }
        return rows;
    }

    const renderAddCommentForm = () => {
        return (
            <>
            <hr />
            <form onSubmit={handleComment}>
                <article className="media card-content mb-0">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src={data.avatar ? data.avatar : genericAvatar.src} />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className='field'>
                            <div className='control'>
                                <textarea className='textarea' name='body' value={commentBody} placeholder='Leave a Comment' onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </article>
                <article className="media card-content mt-0 pt-0">
                    <figure className="media-left">
                        <p className="image is-64x64" />
                    </figure>
                    <button className='button login-btn' type='submit'>Submit</button>
                </article>
            </form>
            </>
        );
    }

    const renderEditCommentForm = () => {
        return (
            <>
            <hr />
            <form onSubmit={handleEditComment}>
                <article className="media card-content mb-0">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src={data.avatar ? data.avatar : genericAvatar.src} />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className='field'>
                            <div className='control'>
                                <textarea className='textarea' name='body' value={commentBody} placeholder='Leave a Comment' onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </article>
                <article className="media card-content mt-0 pt-0">
                    <figure className="media-left">
                        <p className="image is-64x64" />
                    </figure>
                    <div className='is-grouped field'>
                        <div className='control'>
                            <button className='button login-btn' type='submit'>Save</button>
                        </div>
                        <div className='control'>
                            <button className='button logout-btn' type='cancel' onClick={cancelEditComment}>Cancel</button>
                        </div>
                    </div>
                </article>
            </form>
            </>
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
                <div className='card comment-container '>
                    <div className='card-content'>
                        <h2 className='title is-2 recipe-name'>{recipe.name}</h2>
                        <h3 className='subtitle is-3 recipe-name'><em>From {recipe.createdBy.length ? recipe.createdBy[0].username : 'Elixir'}</em></h3>
                        <div className='card main-recipe-container'>
                            <div className='card-content image-card'>
                                <img className='image imageSize' src={recipe.image ? recipe.image : 'https://i.imgur.com/xkynjld.png'} />
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer">
                        {checkFavorite() ? renderRemoveFavoriteButton() : renderAddFavoriteButton()}
                        {recipe.createdBy.length && data._id === recipe.createdBy[0]._id ? <a className='button card-footer-item signup-btn' onClick={handleEdit}>Edit</a> : null}
                    </footer>
                </div>
            </div>

            <div className='column is-vcentered is-two-fifths details-div'>
                <div className='card details-container'>
                    <div className='card-content'>
                        <div>
                            <p className='recipe-types details-title'>{recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'} {recipe.category} In A {recipe.glassType}</p>
                        </div>
                        <br />
                        <div className='card recipe-content-container'>
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
                        <div className='card details-container'>
                            <div className='card-content'>
                                <h2 className='title is-5 details-title'>Instructions</h2>
                                <div className='card recipe-content-container'>
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
                <div className="comment-container card comment-container-adjust">
                    <div className='card-content'>
                        {renderComments()}
                        {editingComment ? renderEditCommentForm() : renderAddCommentForm()}
                    </div>
                </div>
            </div>
        </>
    );
}