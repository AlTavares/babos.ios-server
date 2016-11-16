import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import routes from '../routes';

const mapStateToProps = state => ({ title: state.get('title') });

export let Nav = ({ title }) => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">{title}</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    {routes.map(r => {
                        if (!r.nav) { return }
                        return (
                            <li key={r.path}>
                                <Link className="nav-item nav-link" key={r.path} to={r.path}>{r.title}</Link>
                            </li>
                        )
                    }
                    )}
                </ul>
                <Link key="login" to="/login" className="btn btn-primary pull-right" style={{ marginTop: '6pt' }}>Login</Link>
            </div>
        </div>
    </nav>
)

Nav.displayName = 'Nav';

export default connect(mapStateToProps)(Nav);
