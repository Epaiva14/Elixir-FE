'use client'
import '../css/bulma.css'
import 'bulma/css/bulma.min.css';
import Layout from "@/app/components/layout";
import BackgroundImage from "@/app/components/backgroundImage";
// import CreateRecipeTemplate from './CreateRecipeTemplate';
import EditRecipeTemplate from './EditRecipeTemplate';


export default function newRecipe() {

    return (
        <>
            <Layout>
                
                {/* <BackgroundImage /> */}
                <EditRecipeTemplate />

            </Layout>
        </>
    )
}