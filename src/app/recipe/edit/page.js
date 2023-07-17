'use client';

import '../../css/bulma.css'
import Layout from "@/app/components/layout";
import EditRecipeTemplate from './EditRecipeTemplate';


export default function newRecipe() {

    return (
        <>
            <Layout>
                <EditRecipeTemplate />
            </Layout>
        </>
    )
}