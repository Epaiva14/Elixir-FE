'use client';
import 'bulma/css/bulma.min.css';
import '../css/bulma.css';
import '../css/index.css';
import Image from 'next/image';
import styles from '../page.module.css';
import { useEffect, useState } from 'react';
import setAuthToken from '../utils/setAuthToken';
import Layout from './layout';
import Card from './card';
import BackgroundImage from './backgroundImage';
import RecipePreviewContainer from './recipes/recipePreviewContainer';


export default function SearchForm() {
    const searchStyle = {

        position: 'absolute',
        top: 30,
        width: '100%',
        zIndex: 3,
        justifyContent: 'center',
        maxWidth: '50%',
        borderRadius: '10px',
        marginLeft: '55%'

    };

    // return (
    //     <>
    //         <div style={searchStyle} className="row mt-4">
    //             <div className="col-md-7 offset-md-3">
    //                 <div className="card card-body" >
    //                     <h2 className="py-2">Search</h2>
    //                     {/* <form onSubmit={handleSubmit}> */}
    //                     {/* <form onClick={handleSearchItem}> */}
    //                     <form>
    //                         <div className="form-group">
    //                             <label htmlFor="firstName">Search</label>
    //                             {/* <input type="text" name="firstName" value={firstName} onChange={handleFirstName} className="form-control" /> */}
    //                             <input type="text" name="firstName" value='firstName' className="form-control" />
    //                         </div>
    //                         <div className="form-group">
    //                             <label htmlFor="field">Field</label>
    //                             <select id='field' name='field' className='form-control' required>
    //                                 {/* <select id='field' name='field' className='form-control' onChange={handleField} required> */}
    //                                 <option selected disabled> Choose Field</option>
    //                                 <option value='Recipes'>Recipes</option>
    //                                 <option value='Users'>Users</option>
    //                             </select>
    //                             {/* <input type="text" name="field" value={field} onChange={handleField} className="form-control" /> */}
    //                         </div>
    //                         <button type="submit" className="btn btn-primary float-right">Submit</button>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </>

    // );

    return (
        <div >
        <form className="form-horizontal" style={searchStyle}>
            <fieldset>
                {/* <!-- Form Name --> */}
                <legend>Search</legend>

                {/* <!-- Button Drop Down --> */}
                <label className="label" for="buttondropdown-0">Button Drop Down</label>
                <div className="field has-addons">
                    <div className="control">
                        <input id="buttondropdown-0" name="buttondropdown-0" className="input " placeholder="Search by ingredient" type="text"/>
                    </div>
                    <div className="control">
                        <div className="dropdown is-hoverable">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                    <span>Category</span>
                                    <span className="icon is-small">
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <a href="#">Recipes</a>
                                    </div>
                                    <div className="dropdown-item">
                                        <a href="#">Users</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Select Multiple --> */}
                <div className="field">
                    <label className="label" for="selectmultiple-1">Select Multiple Ingredients </label>
                    <div className="control">
                        <select id="selectmultiple-1" name="selectmultiple-1" className="textarea " multiple="multiple">
                            <option>one ingredient</option>
                            <option>another ingredient</option>
                        </select>
                    </div>
                </div>

                {/* <!-- Button (Double) --> */}
                <div className="field">
                    <label className="label" for="doublebutton-0"></label>
                    <div className="control">
                        <button id="doublebutton-0" name="doublebutton-0" className="button is-success">Submit</button>
                        <button id="doublebutton2-0" name="doublebutton2-0" className="button is-inverted">Cancel</button>
                    </div>
                </div>

            </fieldset>
        </form>
        </div>
    );
}
