'use client';
import '../css/bulma.css';
// import 'bulma/css/bulma.min.css';
import { useEffect, useState } from 'react';
import Layout from '../components/layout'; 
import BackgroundImage from '../components/backgroundImage'; 
import RecipeScrollTile from '../components/recipes/recipeScrollTile';
import RecipeMainComponent from '../components/recipes/recipeScrollTile';


export default function Trending() {
    // state is what the data is representing in realtime
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`)
            .then((res) => res.json())
            .then((data) => {
                // data is an object
                setData(data);
                setLoading(false);
            });
    }, []);

    // if (isLoading) return <p>Loading...</p>;
    // if (!data) return <p>No data shown...</p>;

    return (
        <>
            <Layout>
                <RecipeScrollTile/>
                <BackgroundImage />
            </Layout>

        </>
    )
}
