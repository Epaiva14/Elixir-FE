'use client'
import '../css/bulma.css'
import 'bulma/css/bulma.min.css';
import Layout from "@/app/components/layout";
import BackgroundImage from "@/app/components/backgroundImage";
import CreateRecipeTemplate from './createRecipeTemplate';

export default function newRecipe() {

    return (
        <>
            <Layout>
                {/* <SingleTemplate /> */}
                {/* <BackgroundImage /> */}
                <CreateRecipeTemplate />

            </Layout>
        </>
    )
}