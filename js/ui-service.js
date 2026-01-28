import { appConfig } from './app-config.js';

export function createHelpButton(headerActionsElement) {
    const helpBtn = document.createElement('button');
    helpBtn.className = 'btn btn-help';
    helpBtn.innerText = 'Ajuda';
    helpBtn.style.marginBottom = '10px';

    helpBtn.onclick = () => {
        alert(`
        To-Do List v${appConfig.app.version}

        Como usar:
        1. Digite sua tarefa no campo acima
        2. Clique em "Adicionar Tarefa"
        3. Marque tarefas como concluídas clicando em "COMPLETAR"
        4. Delete tarefas com o botão "REMOVER"
    `)
    };

    headerActionsElement.appendChild(helpBtn);
};

export function createAdvancedEditSection(advancedSectionElement) {
    const section = document.createElement('div');
    section.className = 'advanced-edit-panel';
    section.innerHTML = `
        <h3>Edição Avançada</h3>
        <p>Opções extras para gerenciar suas tarefas:</p>
        <button class="btn" onclick="alert('Duplicar tarefa em desenvolvimento')">Duplicar Tarefa</button>
        <button class="btn" onclick="alert('Agendar tarefa em desenvolvimento')">Agendar</button>
    `;
    advancedSectionElement.appendChild(section);
}