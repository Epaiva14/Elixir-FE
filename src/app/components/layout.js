'use client'
import '../css/bulma.css';
// import 'bulma/css/bulma.min.css';

export default function Layout({ children }) {





    return (
        <>

            <div className='navStyle'>
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

                    <div className="navbar-menu navItemsStyle">

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

            <footer className="footer footerStyle" >
                <div className="content has-text-centered">
                    <img src="https://i.imgur.com/E9RlsOw.png" width="112" height="28" />
                    <p>
                        <strong className='linkStyle'>Elixir</strong> by <strong><a className='linkStyle' href="">M.E.E.T.</a></strong> . The source code is licensed
                        <strong><a className='linkStyle' href="http://opensource.org/licenses/mit-license.php"> MIT</a></strong>. The website content
                        is licensed <strong><a className='linkStyle' href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a></strong>.
                    </p>
                </div>
            </footer>



        </>


    )
}
