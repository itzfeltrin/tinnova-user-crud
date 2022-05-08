import {mount} from '@cypress/react';
import {UserContextProvider} from './context/User.context';
import App from './App';

describe("User CRUD App", () => {
	beforeEach(() => {
		mount(
			<UserContextProvider>
				<App />
			</UserContextProvider>
		);
	})

	it("Starts in user list", () => {
		cy.get('h1').contains('Lista de usuários');
	});
	
	it("Handles add new user link", () => {
		cy.get('a').contains('Adicionar novo usuário').click();
		cy.url().should('include', '/users/new');
	});

	it("Goes to user list from link", () => {
		cy.get('a').contains('Listagem de usuários').click();
		cy.url().should('include', '/users/list');
	});

	it("Goes back to add user from link", () => {
		cy.get('a').contains('Adicionar novo usuário').click();
		cy.url().should('include', '/users/new');
	});

	it("Creates, updates and removes user", () => {
		cy.get('button').contains('Cadastrar').click();
		cy.get('span.error-message').contains('Preencha o campo');
		cy.get('input[name="name"').should('have.class', 'invalid');
		cy.get('input[name="email"]').should('have.class', 'invalid');
		cy.get('input[name="cpf"]').should('have.class', 'invalid');
		cy.get('input[name="phone"]').should('have.class', 'invalid');

		cy.get('input[name="name"]').type('Teste');
		cy.get('input[name="name"').should('not.have.class', 'invalid');

		cy.get('input[name="email"]').type('test@test');
		cy.get('input[name="email"').should('have.class', 'invalid');
		cy.get('span.error-message').contains('E-mail inválido');
		cy.get('input[name="email"]').type('.com');
		cy.get('input[name="email"').should('not.have.class', 'invalid');
		cy.get('span.error-message').contains('E-mail inválido').should('not.exist');

		cy.get('input[name="cpf"]').type('123456789');
		cy.get('input[name="cpf"').should('have.class', 'invalid');
		cy.get('span.error-message').contains('CPF inválido');
		cy.get('input[name="cpf"]').type('22');
		cy.get('input[name="cpf"').should('not.have.class', 'invalid');
		cy.get('span.error-message').contains('CPF inválido').should('not.exist');

		cy.get('input[name="phone"]').type('55549999999');
		cy.get('input[name="phone"').should('have.class', 'invalid');
		cy.get('span.error-message').contains('Telefone inválido');
		cy.get('input[name="phone"]').type('22');
		cy.get('input[name="phone"').should('not.have.class', 'invalid');
		cy.get('span.error-message').should('not.exist');

		cy.get('button').contains('Cadastrar').click();
		cy.url().should('include', '/users/list');

		cy.get('h2.name').contains('Teste').should('exist');
		cy.get('h3.email').contains('test@test.com').should('exist');
		cy.get('p').contains('CPF: 123.456.789-22').should('exist');
		cy.get('p').contains('Telefone: +55 (54) 99999-9922').should('exist');

		cy.get('button.menu').last().click();
		cy.get('button.edit').click({force: true});
		cy.url().should('include', '/users/edit');

		cy.get('input[name="name"]').type(' Editado');
		cy.get('button').contains('Cadastrar').click();
		cy.url().should('include', '/users/list');

		cy.get('h2.name').contains('Teste Editado').should('exist');
		
		cy.get('button.menu').last().click();
		cy.get('button.remove').click({force: true});
		
		cy.get('h2.name').contains('Teste Editado').should('not.exist');
	});
})

