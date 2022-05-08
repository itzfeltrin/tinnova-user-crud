# Gestão de usuários

> Aplicativo Web desenvolvido com o objetivo de possibilitar a gestão de usuários/pessoas. Os dados são persistidos no `localStorage` do navegador.
As ações permitidas são: **Adição**, **Leitura**, **Edição** e **Remoção**.
Um usuário consiste de 4 dados básicos, que são necessários e validados no cadastro e na atualização: **Nome**, **E-mail**, **CPF** e **Telefone**.

## Tecnologias utilizadas

- React 18.0.0
- TypeScript
- Vite
- SCSS
- React-Router
- Jest
- Cypress

## Pré-requisitos

**Certifique-se de ter o [NodeJS](https://nodejs.org/en/download/) e o [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) instalados**

## Reprodução

Para rodar o projeto em seu ambiente local basta clonar os arquivos a partir do repositório git com o comando `git clone`. Você pode também fazer o
download dos arquivos compactados e extraí-los onde desejar.

Com o repositório clonado, basta abrir o terminal e navegar até a pasta onde foi inserido.

***No Windows:*** Abra o menu e digite `cmd` e navegue até a pasta final usando o comando `cd`<br>
(Se tiver dificuldades com essa etapa, confira esse simples tutorial: [Como navegar pelas pastas do Windows com o CMD](https://www.howtogeek.com/659411/how-to-change-directories-in-command-prompt-on-windows-10/#:~:text=If%20the%20folder%20you%20want,window%2C%20and%20then%20press%20Enter.&text=The%20directory%20you%20switched%20to%20will%20be%20reflected%20in%20the%20command%20line.))

***No Linux:*** Abra o terminal com o comando `CTRL+Alt+T` (Ubuntu) ou busque por "terminal" e navegue até a pasta final usando o comando `cd`<br>

Uma vez na pasta, basta instalar as dependências e rodar em modo de desenvolvimento
```
npm install
npm run dev
```
ou
```
yarn install
yarn dev
```
O projeto deve começar a rodar na porta **3000**. Você pode acessar pelo navegador através da url `localhost:3000`

## Testes

Para rodar testes basta executar os scripts `npm run test/yarn test` e `npm run cypress/yarn cypress` através do **Terminal/CMD**

Para ver a cobertura dos testes com Jest basta adicionar a flag `--coverage` ao comando `test` e abrir o arquivo `coverage/index.html`
