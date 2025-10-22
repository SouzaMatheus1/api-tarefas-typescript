document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES ---
    const taskTbody = document.getElementById('task-list-tbody');
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const modalTitle = document.getElementById('modal-title');
    const newTaskBtn = document.getElementById('new-task-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveTaskBtn = document.getElementById('save-task-btn');

    // Campos do formulário
    const taskIdField = document.getElementById('task-id');
    const titleField = document.getElementById('task-title');
    const descriptionField = document.getElementById('task-description');
    const authorSelect = document.getElementById('task-author');
    const attributedSelect = document.getElementById('task-attributed');
    const completedField = document.getElementById('task-completed');

    // URLs da API
    const API_TASKS_URL = '/api/tasks'; // Assumindo que suas rotas de tarefas estão em /api/tasks
    const API_USERS_URL = '/api/users';

    // --- FUNÇÕES ---

    /**
     * Carrega os usuários da API e preenche os <select>
     */
    async function carregarUsuarios() {
        try {
            const response = await fetch(API_USERS_URL);
            if (!response.ok) throw new Error('Erro ao buscar usuários');
            const users = await response.json();

            authorSelect.innerHTML = '<option value="" disabled selected>Selecione um autor</option>';
            attributedSelect.innerHTML = '<option value="">Ninguém (Opcional)</option>';

            users.forEach(user => {
                const option = `<option value="${user.id}">${user.name}</option>`;
                authorSelect.innerHTML += option;
                attributedSelect.innerHTML += option;
            });
        } catch (error) {
            console.error(error);
            authorSelect.innerHTML = '<option value="">Falha ao carregar usuários</option>';
        }
    }

    /**
     * Carrega as tarefas da API e renderiza a tabela
     */
    async function carregarTarefas() {
        try {
            const response = await fetch(API_TASKS_URL);
            if (!response.ok) throw new Error('Erro ao buscar tarefas');
            const tasks = await response.json();

            taskTbody.innerHTML = ''; // Limpa a tabela

            if (tasks.length === 0) {
                taskTbody.innerHTML = '<tr><td colspan="6">Nenhuma tarefa cadastrada.</td></tr>';
                return;
            }

            tasks.forEach(task => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
          <td>${task.id}</td>
          <td>${task.title}</td>
          <td>${task.description.substring(0, 30)}...</td>
          <td>${task.attributed_for ? task.attributed_for.name : 'N/A'}</td>
          <td>${task.completed ? 'Sim' : 'Não'}</td>
          <td>
            <div role="group">
                <button class="btn-edit" data-id="${task.id}">Editar</button>
                <button class="btn-delete secondary" data-id="${task.id}">Excluir</button>
            </div>
          </td>
        `;
                taskTbody.appendChild(tr);
            });
        } catch (error) {
            console.error(error);
            taskTbody.innerHTML = `<tr><td colspan="6">Erro ao carregar tarefas.</td></tr>`;
        }
    }

    /**
     * Abre o modal
     * Se for para editar, 'task' conterá os dados da tarefa
     */
    function openModal(task = null) {
        taskForm.reset(); // Limpa o formulário

        if (task) {
            // Modo Edição
            modalTitle.textContent = `Editando Tarefa (ID: ${task.id})`;
            taskIdField.value = task.id;
            titleField.value = task.title;
            descriptionField.value = task.description;
            authorSelect.value = task.author_id;
            attributedSelect.value = task.attributed_id || '';
            completedField.checked = task.completed;
        } else {
            // Modo Criação
            modalTitle.textContent = 'Nova Tarefa';
            taskIdField.value = '';
        }
        taskModal.showModal(); // Abre o modal
    }

    /**
     * Fecha o modal
     */
    function closeModal() {
        taskModal.close();
    }

    /**
     * Lida com o envio do formulário (Criar ou Atualizar)
     */
    async function handleFormSubmit(event) {
        event.preventDefault();

        const id = taskIdField.value;
        const isUpdating = !!id;

        // Pega os dados do formulário
        const taskData = {
            title: titleField.value,
            description: descriptionField.value,
            author_id: parseInt(authorSelect.value, 10),
            completed: completedField.checked,
            // Se 'attributedSelect.value' for "" (string vazia), envia 'null'
            attributed_id: attributedSelect.value ? parseInt(attributedSelect.value, 10) : null
        };

        // Validação simples
        if (!taskData.author_id) {
            alert('Por favor, selecione um autor.');
            return;
        }

        const url = isUpdating ? `${API_TASKS_URL}/${id}` : API_TASKS_URL;
        const method = isUpdating ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao salvar tarefa');
            }

            closeModal();
            carregarTarefas(); // Recarrega a lista de tarefas
        } catch (error) {
            console.error(error);
            alert(`Erro: ${error.message}`);
        }
    }

    /**
     * Deleta uma tarefa
     */
    async function deletarTarefa(id) {
        if (!confirm(`Tem certeza que deseja excluir a tarefa ID ${id}?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_TASKS_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Falha ao deletar tarefa');
            }

            carregarTarefas(); // Recarrega a lista
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    /**
     * Lida com cliques na tabela (para botões de Editar e Excluir)
     */
    async function handleTableClick(event) {
        const target = event.target;
        const id = target.dataset.id;

        // Botão de Deletar
        if (target.classList.contains('btn-delete')) {
            deletarTarefa(id);
        }

        // Botão de Editar
        if (target.classList.contains('btn-edit')) {
            try {
                // Busca os dados mais recentes da tarefa antes de abrir o modal
                const response = await fetch(`${API_TASKS_URL}/${id}`);
                if (!response.ok) throw new Error('Não foi possível carregar dados da tarefa');
                const task = await response.json();
                openModal(task);
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        }
    }

    // --- INICIALIZAÇÃO ---
    newTaskBtn.addEventListener('click', () => openModal(null));
    closeModalBtn.addEventListener('click', closeModal);
    taskForm.addEventListener('submit', handleFormSubmit);
    taskTbody.addEventListener('click', handleTableClick);

    // Carrega os dados iniciais
    carregarUsuarios();
    carregarTarefas();
});