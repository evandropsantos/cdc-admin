import React, { Component } from 'react';

import './css/pure-min.css';
import './css/side-menu.css';

import $ from 'jquery';

class App extends Component {

	constructor() {

		super();

		this.state = { lista: [], nome: '', email: '', senha: '' };

		this.enviaForm = this.enviaForm.bind(this);

		this.setNome = this.setNome.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setSenha = this.setSenha.bind(this);
	}

	componentDidMount() {

		// const xhr = new XMLHttpRequest();

		// //xhr.open('GET', 'http://cdc-react.herokuapp.com/api/autores');
		// xhr.open('GET', 'http://localhost:8080/api/autores');

		// xhr.onreadystatechange = function() {

		// 	if( xhr.readyState === 4) 
		// 		if( xhr.status === 200) 
		// 			this.setState( { lista: JSON.parse(xhr.responseText) } );
		// }.bind(this)

		// xhr.send();

		$.ajax({
			url: "http://localhost:8080/api/autores",
			dataType: 'json',
			success: function(resposta) { 

				this.setState({lista:resposta});
			}.bind(this)
		});      
	}

	enviaForm(event) {

		event.preventDefault();

		// let data = {
		// 	nome: this.state.nome, 
		// 	email: this.state.email, 
		// 	senha: this.state.senha
		// };

		// console.log(data);

		// const xhr = new XMLHttpRequest();

		// xhr.open('POST', 'http://localhost:8080/api/autores');

		// xhr.setRequestHeader('Content-type', 'application/json');
		// xhr.setRequestHeader('data-type', 'json');
		
		// xhr.onreadystatechange = function() {
		// 	if( xhr.readyState === 4) {
		// 		if( xhr.status === 200) {
		// 			console.log('Cadastrado -> ', xhr.responseText);
		// 			this.setState({lista: JSON.stringify(xhr.responseText)} );
		// 		}
		// 	}
		// }.bind(this);

		// xhr.send( JSON.stringify(data) );

		$.ajax({
			url:"http://localhost:8080/api/autores",
			contentType: 'application/json',
			dataType:'json',
			type:'post',
			data: JSON.stringify( {nome: this.state.nome, email: this.state.email, senha: this.state.senha} ),
			success: function(resposta) {

				console.log("Cadastrado com sucesso");
				this.setState({lista:resposta});
			}.bind(this),
			error: function(error) { console.log(error); }
		});
	}

	setNome( event ) { this.setState( {nome: event.target.value} ); }

	setEmail( event ) { this.setState( {email: event.target.value} ); }

	setSenha( event ) { this.setState( {senha: event.target.value} ); }
	
	render() {

		return (
			<div id="layout">
				<a href="#menu" id="menuLink" className="menu-link"><span></span></a>

				<div id="menu">
					<div className="pure-menu">
						<a className="pure-menu-heading" href="">Company</a>

						<ul className="pure-menu-list">
							<li className="pure-menu-item"><a href="" className="pure-menu-link">Home</a></li>
							<li className="pure-menu-item"><a href="" className="pure-menu-link">Autor</a></li>
							<li className="pure-menu-item"><a href="" className="pure-menu-link">Livro</a></li>
						</ul>
					</div>
				</div>

				<div id="main">
					<div className="header"><h1>Cadastro de Autores</h1></div>

					<div className="content" id="content">
						<div className="pure-form pure-form-aligned">
							<form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
								<div className="pure-control-group">
									<label htmlFor="nome">Nome</label> 
									<input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}  />                  
								</div>

								<div className="pure-control-group">
									<label htmlFor="email">Email</label> 
									<input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}  />                  
								</div>

								<div className="pure-control-group">
									<label htmlFor="senha">Senha</label> 
									<input id="senha" type="password" name={this.state.senha} onChange={this.setSenha}  />                                      
								</div>

								<div className="pure-control-group">                                  
									<label></label> 
									<button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
								</div>
							</form>             
						</div> 

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
					</div>
				</div> 
			</div>
		);
	}
}

export default App;
