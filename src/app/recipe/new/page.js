'use client';

import '../../css/bulma.css';
import Layout from '@/app/components/layout';
import CreateRecipeTemplate from './CreateRecipeTemplate';

export default function newRecipe() {

    return (
        <>
            <Layout>
                <CreateRecipeTemplate />
            </Layout>
        </>
    )
}