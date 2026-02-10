# Resumo do Projeto todo-app

## Visão Geral

todo-app é uma aplicação web para gerenciamento de tarefas, construída com TypeScript e Vite. O projeto está organizado de forma modular, facilitando manutenção e expansão.

## Estrutura de Pastas

- **index.html**: Página principal da aplicação.
- **styles.css**: Estilos globais.
- **src/**: Código-fonte principal.
  - **main.ts**: Ponto de entrada da aplicação.
  - **mappers/**: Contém mapeadores de dados, como `task.mapper.ts`.
  - **models/**: Define modelos de dados, como `task.model.ts` e `api-task.model.ts`.
  - **services/**: Serviços responsáveis pela lógica de negócio e integração:
    - `api-service.ts`: Comunicação com APIs externas.
    - `app-config.ts`: Configurações da aplicação.
    - `branding-service.ts`: Gerenciamento de temas e identidade visual.
    - `storage-service.ts`: Persistência local de dados.
    - `task-service.ts`: Lógica de tarefas.
    - `ui-service.ts`: Manipulação da interface.
- **__tests__/**: Testes automatizados.
- **package.json**: Gerenciamento de dependências e scripts.
- **tsconfig.json**: Configuração do TypeScript.
- **vite.config.ts**: Configuração do Vite.
- **README.md**: Documentação inicial.

## Estado Atual

O projeto está em fase de desenvolvimento, com estrutura modular e separação clara de responsabilidades. Os principais serviços já estão implementados, permitindo:
- Criação, edição e exclusão de tarefas
- Persistência local e integração com API
- Interface personalizável
- Testes automatizados

A arquitetura favorece escalabilidade e manutenção, sendo ideal para futuras melhorias e integração de novas funcionalidades.

---

Este documento resume a organização e funcionamento do projeto todo-app, facilitando o entendimento para novos colaboradores ou revisores.