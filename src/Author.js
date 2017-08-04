import React, { Component } from 'react';
import $ from 'jquery';

import InputCustom from './components/InputCustom';
import SubmitCustom from './components/SubmitCustom';

export class FormAuthor extends Component {

    constructor() {

        super();

        this.state = { nome: '', email: '', senha: '' };

		this.enviaForm = this.enviaForm.bind(this);
		this.setNome = this.setNome.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(event) {

		event.preventDefault();

		$.ajax({
			url:"http://localhost:8080/api/autores",
			contentType: 'application/json',
			dataType:'json',
			type:'post',
			data: JSON.stringify( {nome: this.state.nome, email: this.state.email, senha: this.state.senha} ),
			success: function(response) { this.setState({lista:response}); }.bind(this),
			error: function(error) { console.log(error); }
		});
	}

	setNome(event) { this.setState({nome: event.target.value}); }

	setEmail(event) { this.setState({email: event.target.value}); }

	setSenha(event) { this.setState({senha: event.target.value}); }

    render() {

        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustom id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                    <InputCustom id="email" type="text" name="email" value={this.state.email} onChange={this.setEmail} label="E-mail" />
                    <InputCustom id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                    <SubmitCustom label="Gravar" />
                </form>             
            </div> 
        );
    }
}

export class TableAuthor extends Component {

    constructor() {

        super();

        this.state = {lista: []};
    }

    componentDidMount() {

		$.ajax({
			url: "http://localhost:8080/api/autores",
			dataType: 'json',
			success: function(response) { this.setState({lista:response}); }.bind(this)
		});      
    }
    
    render() {

        return (
            <div>            
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            this.state.lista.map(function(autor) {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table> 
            </div>   
        );
    }
}