# Frontend do Task Manager

Este é o frontend do Task Manager, uma aplicação web para gerenciar tarefas e tags associadas a essas tarefas. Com este aplicativo, você pode facilmente criar, visualizar, atualizar e excluir tarefas, além de gerenciar as tags relacionadas a essas tarefas.

## Tecnologias Utilizadas

- React.js
- Axios
- Bootstrap (para estilos)

## Funcionalidades

- Autenticação de usuário (login e signup)
- Exibição de lista de tarefas e tags
- Criação, edição e exclusão de tarefas e tags
- Filtro de tarefas por título e/ou tag

## Configuração

1. Clone o repositório para o seu ambiente local:

```
git clone https://github.com/seu-usuario/task-manager-frontend.git
```

2. Navegue até o diretório do projeto:

```
cd task-manager-frontend
```

3. Instale as dependências do Node.js:

```
npm install
```

4. Certifique-se de ter o backend do Task Manager em execução. Se ainda não tiver, siga as instruções no README do backend para configurá-lo.

5. Execute o aplicativo:

```
npm start
```

O aplicativo será executado em `http://localhost:3000`.

## Uso

- Após iniciar o aplicativo, você será redirecionado para a página de login.
- Se não tiver uma conta, você pode criar uma clicando na opção "Sign Up" e preenchendo o formulário.
- Após fazer login ou criar uma conta, você será redirecionado para a página da aplicação, onde poderá gerenciar suas tarefas e tags.

## Estrutura do Projeto

- `src/components`: Contém os componentes React, como TaskList, TagList, Login e Signup.
- `src/App.js`: Arquivo principal do aplicativo, onde são definidas as rotas e o estado de autenticação.
- `src/index.js`: Arquivo de entrada do aplicativo React.
- `public/index.html`: Arquivo HTML base do aplicativo.

## Back-end do Projeto

- [Repo](https://github.com/devfelipelimabr/task-manager-back-end.git)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue para relatar um problema ou sugerir uma melhoria.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

--- 
