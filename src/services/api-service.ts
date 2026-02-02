import { AppConfig } from './app-config';
import { Task } from '../models/task.model';
import { ApiTask } from '../models/api-task.model';
import { mapApiTaskToTask } from '../mappers/task.mapper';

interface TasksApiResponse {
    tasks: ApiTask[];
}

export class ApiService {
    private readonly apiUrl: string;
    private readonly mockTasks: ApiTask[];

    constructor() {
        this.apiUrl = 'https://dummyjson.com/todos';
        this.mockTasks = this.generateMockData();
    }

    private generateMockData(): ApiTask[] {
        return [
            { id: 1, todo: '🎯 Aprender JavaScript', completed: false, },
            { id: 2, todo: '📚 Estudar Services em JS', completed: false, },
            { id: 3, todo: '✅ Implementar API Service', completed: false, },
            { id: 4, todo: '🧪 Escrever Testes Unitários', completed: false, }
        ];
    }

    // USADO QUANDO useExternalApi ESTÁ DESATIVADO
    async fetchMockTasks(): Promise<Task[]> {
        console.log('📦 ApiService: Retornando dados MOCK');

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockTasks.map(mapApiTaskToTask));
            }, 500);
        });
    }

    // USADO QUANDO useExternalApi ESTÁ ATIVADO
    async fetchRemoteTasks(): Promise<Task[]> {
        console.log('🌐 ApiService: Buscando dados da API externa')

        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            // Corrige: acessa o array 'tasks' da resposta
            const data: TasksApiResponse = await response.json();

            if (Array.isArray(data.tasks)) {
                return data.tasks.slice(0, 4).map(mapApiTaskToTask);
            }
            
            console.error('❌ ApiService: Resposta da API não contém array "tasks" válido.');
            return this.mockTasks.map(mapApiTaskToTask);

        } catch (error) {
            console.error('❌ ApiService: Erro ao buscar dados remotos', error);

            // Fallback: retorna mock se API falhar
            return this.mockTasks.map(mapApiTaskToTask);
        }
    }

    async fetchTasks(): Promise<Task[]> {
        console.log(`⚙️  ApiService: useExternalApi = ${AppConfig.features.useExternalApi}`);
        
        return AppConfig.features.useExternalApi
            ? this.fetchRemoteTasks()
            : this.fetchMockTasks();

    }

}

export const apiService = new ApiService();