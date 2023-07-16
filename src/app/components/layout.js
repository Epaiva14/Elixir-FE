'use client'
import '../css/bulma.css';
import '../css/index.css';
// import 'bulma/css/bulma.min.css';

export default function Layout({ children }) {





    return (
        <>


            <nav className="navbar navStyle is-mobile is-tablet is-desktop is-widescreen" role="navigation" aria-label="main navigation">

                <div className="navbar-brand">
                    <a href="/">
                        <img src="https://i.imgur.com/E9RlsOw.png" width="112" height="28" />
                    </a>
                </div>


                <div className="navbar-menu navItemsStyle">

                    {/* <div className="navbar-start is-centered" >
                        <a className="navbar-item" href="/search" >
                            Search
                        </a>
                    </div> */}

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons" id='nav-button'>
                                <a className="button is-primary is-responsive" href='/users/profile'>
                                    <strong>Profile</strong>
                                </a>
                                <a className="button is-primary is-responsive" href='/search'>
                                    <strong>Search</strong>
                                </a>
                                <a className="button is-light is-responsive" href='/users/login'>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </nav>


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
