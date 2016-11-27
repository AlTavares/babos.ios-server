import React from 'react'
import UserService from '../services/user'
import Loader from '../components/loader'

import './form.scss';

var loginState = {
    register: false,
    title: 'Login',
    registerButton: 'Cadastre-se',
    confirmationButton: 'Entrar'
}

var registerState = {
    register: true,
    title: 'Cadastro',
    registerButton: 'Já sou cadastrado',
    confirmationButton: 'Cadastrar'
}

class FormLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = loginState
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        this.cleanError()
        this.showLoader(true)
        var form = e.target
        if (this.state.register) {
            this.register(form)
            return
        }
        this.login(form)
    }

    showLoader(value){
        this.setState({loading: value})
    }

    register(form) {
        UserService.register(form.name.value, form.email.value, form.password.value, (error, user) => this.userCallback(error, user))
    }

    login(form) {
        UserService.login(form.email.value, form.password.value, (error, user) => this.userCallback(error, user))
    }

    userCallback(error, user) {
        console.debug(error, user)
        this.showLoader(false)
        if (error) {
            this.showError(error.message)
            return
        }
        if (user) {
            console.debug('redirect')
            window.location = '/'
        }
    }

    cleanError() {
        this.setState({ error: null })
    }

    showError(message) {
        var error =
            <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Erro:</span>
                {message}
            </div>
        this.setState({
            error: error
        })
        console.debug('ALPACA')
        console.debug(this.state)
    }

    handleRegisterClick(e) {
        e.preventDefault()
        var state = this.state.register ? loginState : registerState
        this.setState(state)
    }

    render() {
        var name
        if (this.state.register) {
            name = (
                <label htmlFor="name">
                    Nome:
			<input type="text" name="name" id="name" placeholder="Nome e sobrenome" required="required" />
                </label>
            )
        }
        return (
            <div>
                <div id="loginBox">
                    <Loader active={this.state.loading}/>
                    <section>
                        <h2>{this.state.title}</h2>
                        <form onSubmit={this.handleSubmit} className="minimal">
                            {name}
                            <label htmlFor="email">
                                Email:
			<input type="email" name="email" id="email" placeholder="Preencha com um email válido" required="required" />
                            </label>
                            <label htmlFor="password">
                                Password:
			<input type="password" name="password" id="password" placeholder="Deve conter caracteres em maiusculo, minúsculo e números" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" />
                            </label>
                            <button type="submit" className="btn-minimal">{this.state.confirmationButton}</button>
                            <button className="btn-minimal pull-right" onClick={this.handleRegisterClick}>{this.state.registerButton}</button>
                        </form>
                        <br />
                        {this.state.error}
                    </section>
                </div>
            </div>
        );
    }
}

FormLogin.displayName = 'FormLogin';

export default FormLogin
