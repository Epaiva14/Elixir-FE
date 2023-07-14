'use client'
import '../../css/bulma.css';
import '../../css/index.css';

export default function RecipePreviewContainer() {



    return (
        <>
            <div className='card-hover'>
            <div className="card recipe-style" >
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="https://www.thecocktaildb.com/images/media/drink/uxywyw1468877224.jpg" alt="Placeholder image" />
                    </figure>
                </div>
                <div className='recipe-on-hover'>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">Whatever the fuck this is</p>
                            <p className="subtitle is-6">Elixir</p>
                        </div>
                    </div>
                </div>
                    <div className="overlay">
                        <div className="content1">
                            <p>
                                1. You put your left leg in 
                                <br /> 
                                2. You take your left leg out 
                                <br />
                                3. You put your left leg in 
                                <br />
                                4. And you shake it all about
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )

}