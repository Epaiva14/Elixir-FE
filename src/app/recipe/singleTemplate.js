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
                <div className='commentTextArea' key={comments[i]._id}>
                    <h2 key={comments[i].title}>{comments[i].createdBy ? comments[i].createdBy[0].username : null} - {comments[i].title}</h2>
                    <p key={comments[i].body}>{comments[i].body}</p>
                    {data._id === comments[i].createdBy[0]._id ? <a className='button' onClick={() => presentEditCommentForm(comments[i]._id)}>Edit</a> : null}
                    {data._id === comments[i].createdBy[0]._id ? <a className='button' onClick={() => handleDeleteComment(comments[i]._id)}>Delete</a> : null}
                    <hr />
                </div>
            );
        }
        return rows;
    }

    const renderAddCommentForm = () => {
        return (
            <form className='commentForm' onSubmit={handleComment}>
                <div className='field'>
                    <div className='control'>
                        <textarea className='textarea' name='body' value={commentBody} placeholder='Leave a Comment' onChange={handleChange} />
                    </div>
                </div>
                <div className='field'>
                    <div className='control'>
                        <button className='button is-link' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        );
    }

    const renderEditCommentForm = () => {
        return (
            <form className='commentForm' onSubmit={handleEditComment}>
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
            <a className='button favoriteButtonStyle' onClick={handleRemoveFavorite}>Favorite -</a>
        );
    }

    const renderAddFavoriteButton = () => {
        return (
            <a className='button favoriteButtonStyle' onClick={handleAddFavorite}>Favorite +</a>
        );
    }

    const renderInstructions = () => {
        if (!recipe.instructions) {
            return (
                <div className='column bulmaColumnStyle1'>
                    <h3 className='title is-2 instructions-title'>Instructions:</h3>
                    <div className='descriptionStyle column is-11'>There are no instructions for this drink</div>
                </div>

            )
        } else {
            <div className='column bulmaColumnStyle1'>
                <h3 className='title is-2 instructions-title'>Instructions:</h3>
                <div className='descriptionStyle column is-11'>{recipe.instructions}</div>
            </div>
        }


    }

    if (isLoading || commentsLoading) return <p>Loading ...</p>;

    return (
        <>
            <div className='column specialColumn'>

                <div className='column bulmaColumnStyle is-12'>
                    <div className='column is-3 is-offset-0'>
                        <img className='imageSize' src={recipe.image ? recipe.image : 'https://i.imgur.com/xkynjld.png'} />
                    </div>
                    <div className='column is-3 is-offset-0 card recipeBox'>
                        <div><strong>{recipe.name}</strong></div>
                        <br />
                        <ul>
                            {renderIngredients()}
                        </ul>
                        <div>{recipe.description}</div>
                        <br />
                    </div>
                    <div className='column is-3 is-offset-8  card recipeCategory'>
                        <div><strong>Alcohol?: </strong>{recipe.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}</div>
                        <div><strong>Glass type: </strong>{recipe.glassType}</div>
                        <div><strong>Category: </strong>{recipe.category}</div>
                        <div className='createdBy'>
                            Recipe By:
                            <br />
                            {recipe.createdBy.length ? recipe.createdBy[0].username : 'Elixir'}
                        </div>
                    </div>

                    <div className='column is-1 is-offset-0 favoriteButton'>
                        {checkFavorite() ? renderRemoveFavoriteButton() : renderAddFavoriteButton()}
                    </div>

                    <div className='column is-1 is-offset-1 editCommentButton'>
                        {recipe.createdBy.length && data._id === recipe.createdBy[0]._id ? <a className='button specialEditStyle' onClick={handleEdit}>Edit</a> : null}
                    </div>

                </div>

                {renderInstructions()}
                {/* <div className='column bulmaColumnStyle1'> }
                    <h3 className='title is-2 instructions-title'>Instructions:</h3>
                    <div className='descriptionStyle column is-11'>{recipe.instructions}</div>
                </div> */}

                {/* MIKEY HERE - MOVE THIS BUTTON AND DITCH THE DIV WHEN STYLING, ONLY PUT HERE SO I COULD FIND IT AND CLICK ON IT */}

                <div className='column is-11 bulmaColumnStyle3'>
                    <h2 className='title is-2 comment-title'>Comments:</h2>
                    <div className='column commentStyle'>
                        {/* MIKEY HERE - MOVE THIS FORM SOMEWHERE ELSE AND GET RID OF commentStyle CLASS AT SOME POINT - I PUT IT HERE SO I COULD SEE IT AND USE IT WHILE DEVELOPING */}

                        {renderComments()}

                        {editingComment ? renderEditCommentForm() : renderAddCommentForm()}

                    </div>
                </div>
            </div>

        </>
    );
}