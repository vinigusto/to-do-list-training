# Fluxo de Dados e Estrutura de Objetos do Projeto todo-app

## 1. Fluxograma Geral do Fluxo de Dados

```mermaid
graph TD;
    UI[Interface do Usuário (index.html)] -->|Ações do Usuário| MainTS[main.ts]
    MainTS -->|Inicializa| TaskService[task-service.ts]
    MainTS -->|Renderiza| UIService[ui-service.ts]
    MainTS -->|Configura| BrandingService[branding-service.ts]
    TaskService -->|Carrega/Salva| StorageService[storage-service.ts]
    TaskService -->|Busca Remota| ApiService[api-service.ts]
    ApiService -->|Mapeia| TaskMapper[task.mapper.ts]
    TaskService -->|Modela| TaskModel[task.model.ts]
    ApiService -->|Modela| ApiTaskModel[api-task.model.ts]
```

## 2. Estrutura de Objetos e Métodos (Exemplo)

### Objeto: Task
- id: number
- text: string
- completed: boolean
- Métodos: (manipulados via TaskService)
    - adicionar
    - remover
    - alternar status

### Objeto: TaskService
- tasks: Task[]
- Métodos:
    - initializeTasks()
    - addTaskToArray(text)
    - deleteTaskFromArray(id)
    - toggleTaskStatus(id)
    - getTasks()
    - clearTasks()

### Objeto: ApiService
- Métodos:
    - fetchTasks() // Busca tarefas da API ou mock
    - fetchRemoteTasks()
    - fetchMockTasks()

### Exemplo de Interação (semelhante à imagem)

| Objeto1 (TaskService) | Método         | Parâmetro         | Objeto2 (ApiService/StorageService) |
|----------------------|---------------|-------------------|-------------------------------------|
| initializeTasks()    | fetchTasks()  | -                 | ApiService                          |
| addTaskToArray()     | saveTasks()   | tasks: Task[]     | StorageService                      |
| deleteTaskFromArray()| saveTasks()   | tasks: Task[]     | StorageService                      |

## 3. Resumo do Fluxo
- O usuário interage com a interface (UI), que chama funções em main.ts.
- main.ts delega operações para os serviços (TaskService, ApiService, StorageService, etc).
- TaskService gerencia o array de tarefas e coordena a persistência/local ou busca remota.
- ApiService faz a ponte com a API externa ou retorna dados mock.
- StorageService salva/carrega tarefas do localStorage.
- O fluxo é modular, cada serviço tem responsabilidade única.

---

Este documento serve como referência visual e conceitual para o fluxo de dados e a estrutura de objetos do projeto todo-app.