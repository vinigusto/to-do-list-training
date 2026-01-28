import { appConfig } from './app-config.js';

export class ApiService {

    constructor() {
        this.apiUrl = 'https://dummyjson.com/todos';
        this.mockTasks = this.generateMockData();
    }

    generateMockData() {
        return [
            {
                id: 1,
                todo: '🎯 Aprender JavaScript',
                completed: false,
            },
            {
                id: 2,
                todo: '📚 Estudar Services em JS',
                completed: false,
            },
            {
                id: 3,
                todo: '✅ Implementar API Service',
                completed: false,
            },
            {
                id: 4,
                todo: '🧪 Escrever Testes Unitários',
                completed: false,
            }
        ];
    }

    // USADO QUANDO useExternalApi ESTÁ DESATIVADO
    async fetchMockTasks() {
        console.log('📦 ApiService: Retornando dados MOCK');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockToDos);
            }, 500);
        });
    }

    // USADO QUANDO useExternalApi ESTÁ ATIVADO
    async fetchRemoteTasks() {
        console.log('🌐 ApiService: Buscando dados da API externa')
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            // Corrige: acessa o array 'todos' da resposta
            const data = await response.json();
            if (Array.isArray(data.todos)) {
                return data.todos.slice(0, 4);
            } else {
                console.error('❌ ApiService: Resposta da API não contém array "todos"');
                return this.mockTasks;
            }

        } catch (error) {
            console.error('❌ ApiService: Erro ao buscar dados remotos', error);

            // Fallback: retorna mock se API falhar
            return this.mockTasks;
        }
    }

    async fetchTasks() {
        console.log(`⚙️  ApiService: useExternalApi = ${appConfig.features.useExternalApi}`);

        if (appConfig.features.useExternalApi) {
            return await this.fetchRemoteTasks();
        } else {
            return await this.fetchMockTasks();
        }
    }

}

export const apiService = new ApiService();