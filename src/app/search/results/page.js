'use client';
import Layout from '../../components/layout';
import BackgroundImage from '../../components/backgroundImage';
import SearchForm from '../searchForm';
import { useEffect, useState } from 'react';


export default function Search() {
    const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('searchResults')));
    // console.log(searchResults);
    return (
        <>
            {/* <Layout /> */}
            {searchResults ? searchResults.map(recipe => {
                return <div key={recipe._id}>{recipe.name}</div>
            }) : ''}
            {/* <BackgroundImage /> */}
        </>
    );
}