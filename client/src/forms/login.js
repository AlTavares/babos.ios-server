import React from 'react';
import UserService from '../services/user'

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
        console.debug(this.state)
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        var form = e.target
        if (this.state.register) {
            this.register(form)
            return
        }
        this.login(form)
    }

    register(form) {
        UserService.register(form.name.value, form.email.value, form.password.value, this.userCallback)
    }

    login(form) {
        UserService.login(form.email.value, form.password.value, this.userCallback)
    }

    userCallback(error, user) {
        console.debug(error, user)
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
            <div id="loginBox">
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
                </section>
            </div>
        );
    }
}

FormLogin.displayName = 'FormLogin';

export default FormLogin