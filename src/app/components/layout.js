'use client'
import '../css/bulma.css';
import 'bulma/css/bulma.min.css';

export default function Layout({ children }) {



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

    const footerStyle = {
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.1);',
        padding: '1rem',
        color: 'white',
        zIndex: 10,
    };

    const linkStyle = {
        color: '#F0D7CF'
    }

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

            {children}

            <footer className="footer" style={footerStyle}>
                <div className="content has-text-centered">
                    <img src="https://i.imgur.com/E9RlsOw.png" width="112" height="28" />
                    <p>
                        <strong style={linkStyle}>Elixir</strong> by <strong><a style={linkStyle} href="">M.E.E.T.</a></strong> . The source code is licensed
                        <strong><a style={linkStyle} href="http://opensource.org/licenses/mit-license.php"> MIT</a></strong>. The website content
                        is licensed <strong><a style={linkStyle} href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a></strong>.
                    </p>
                </div>
            </footer>



        </>


    )
}