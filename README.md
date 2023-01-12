# Desafio 

<br>

## 👨‍💻 Tecnologias e bibliotecas

#### Este sistema foi desenvolvido com as seguintes tecnologias e bibliotecas:

- **Design:** [Figma](https://www.figma.com/)
- **Server:** [Node.js](https://nodejs.org/en/)
- **Banco de dados:** [MongoDB](https://www.mongodb.com/)
- **Cliente HTTP**:  [axios](https://github.com/axios/axios)
- **Framework CSS**: [TailwindCSS](https://tailwindcss.com/)
- **Front End Web:** [Vite - React](https://vitejs.dev/)

<br>

## 📱 Design

#### Este projeto foi desenvolvido com base nas seguintes telas:

- https://www.figma.com/file/8vjL0GZcF1tl8GyZ6qzzEL/Untitled?node-id=1%3A3&t=sS5xsK8kbwNwF8N6-1

<br>

## 🛣️ Rotas

#### Endpoints da aplicação backend - documentadas com swagger.

<details open>
<summary></summary>

- **Auth**
  - **POST**: /login
  - **POST**: /refresh-token 
- **Users**
  - **POST**: /users
  - **GET**: /users/:id
  - **DELETE**: /users:id
- **Customer**
  - **POST**: /customers
  - **GET**: /customers
  - **GET**: /customers/:id
  - **PUT**: /customers/:id
  - **DELETE**: /customers/:id
</details>
<br>

## ℹ️ Como usar o aplicativo

### Pré-requisitos

Para clonar e rodar a aplicação, é necessário ter instalado em sua máquina as ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/) (opcional).
Além disso, é bom que se tenha um bom editor de código, como o [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone https://github.com/joaovtmarques/desafio-sharenergy-2023-01.git
# Acesse a pasta do projeto no terminal
$ cd desafio-sharenergy-2023-01
# Alterne para a branch 'joao-vitor-da-silva-marques'
$ git checkout joao-vitor-da-silva-marques
# Atualize o conteúdo
$ git pull
# Navegue até a pasta 'server'
$ cd server
# Baixe as depêndencias
$ npm/yarn install
# Execute a aplicação
$ npm run start:dev ou yarn start:dev
# O servidor deve iniciar na porta 3000.
# Acesse a documentação de rotas em
$ http://localhost:3000/docs
```
```bash
# Acesse em outro terminal a pasta 'web'
$ cd web
# Baixe as depêndencias
$ npm/yarn install
# Execute a aplicação
$ npm run dev ou yarn dev
# A aplicação deve iniciar em alguns segundos
# Acesse a aplicação em 
$ http://localhost:5173/
```