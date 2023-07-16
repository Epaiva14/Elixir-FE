'use client';

import '../css/bulma.css';
import '../css/index.css';
import Layout from '../components/layout';
import BackgroundImage from '../components/backgroundImage';
import SearchForm from './searchForm';

export default function Search() {
    return (
        <>
            <Layout>
                <SearchForm />
                <BackgroundImage />
            </Layout>
        </>
    );
}