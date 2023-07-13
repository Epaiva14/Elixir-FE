'use client'
import '../css/bulma.css';

export default function Layout() {



    const navStyle = {
        position: 'absolute',
        left: 0,
        width: '100%',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.1);',
        justifyContent: 'center',
    }

    const navItemsStyle = {
        marginLeft: '22.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',

    };







    return (
        <>
            <div style={navStyle}>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a href="/">
                            <img src="https://i.imgur.com/E9RlsOw.png" width="112" height="28" />
                        </a>

                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className="navbar-menu" style={navItemsStyle}>

                        <div className="navbar-start is-centered" >
                            <a className="navbar-item" href='/' >
                                Home Feed
                            </a>

                            <a className="navbar-item" href="/trending" >
                                Trending Recipes
                            </a>

                            <a className="navbar-item" href="/users/profile" >
                                Profile
                            </a>

                            <a className="navbar-item" href="/search" >
                                Search
                            </a>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons" id='nav-button'>
                                    <a className="button is-primary">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a className="button is-light">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>


        </>
    )
}