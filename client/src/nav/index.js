import React from 'react'
import { Link } from 'react-router'
import routes from '../routes'
import User from '../services/user'

class Nav extends React.Component {


    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this);
        this.state = { userLogged: User.isLogged() }
    }

    handleLogout() {
        User.logout()
        this.setState({ userLogged: false })
    }

    render() {
        var login
        if (this.state.userLogged) {
            login = <button type="submit" className="btn btn-primary pull-right" style={{ marginTop: '6pt' }} onClick={this.handleLogout}>{User.getName() + ' -'} Logout</button>
        } else {
            login = <Link key="login" to="/login" className="btn btn-primary pull-right" style={{ marginTop: '6pt' }}>Login</Link>
        }

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" key='title' to='/'>WebPlantas</Link>
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
                        {login}
                    </div>
                </div>
            </nav>
        )
    }
}


Nav.displayName = 'Nav'

export default Nav
