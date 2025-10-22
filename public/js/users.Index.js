document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES DOS ELEMENTOS ---
    const userForm = document.getElementById('user-form');
    const userTbody = document.getElementById('user-list-tbody');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');
    const cancelButton = document.getElementById('cancel-button');
    
    // Campos do formulário
    const userIdField = document.getElementById('user-id');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const API_URL = '/api/users';

    // --- FUNÇÕES DE LÓGICA ---

    /**
     * Função principal para carregar e exibir todos os usuários
     */
    async function carregarUsuarios() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) 
                throw new Error('Erro ao buscar usuários');
            
            const users = await response.json();
            
            userTbody.innerHTML = ''; // Limpa o "Carregando..." ou dados antigos

            if (users.length === 0) {
                userTbody.innerHTML = '<tr><td colspan="4">Nenhum usuário cadastrado.</td></tr>';
                return;
            }

            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn-edit" data-id="${user.id}">Editar</button>
                        <button class="btn-delete secondary" data-id="${user.id}">Excluir</button>
                    </td>
                `;
                userTbody.appendChild(tr);
            });
            
        } catch (error) {
            console.error(error);
            userTbody.innerHTML = `<tr><td colspan="4">Erro ao carregar usuários.</td></tr>`;
        }
    }

    /**
     * Preenche o formulário para edição
     */
    async function preencherFormularioParaEdicao(id) {
        try {
            // Busca os dados mais recentes do usuário
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) 
                throw new Error('Usuário não encontrado');
            
            const user = await response.json();

            // Preenche o formulário
            userIdField.value = user.id;
            nameField.value = user.name;
            emailField.value = user.email;
            passwordField.placeholder = "Deixe em branco para não alterar";
            passwordField.required = false; // Senha não é obrigatória na edição

            // Ajusta a UI do formulário
            formTitle.textContent = `Editando Usuário (ID: ${user.id})`;
            submitButton.textContent = 'Atualizar';
            cancelButton.style.display = 'inline-block'; // Mostra o botão de cancelar
            
            window.scrollTo(0, 0); // Rola a página para o topo

        } catch (error) {
            console.error(error);
            alert('Falha ao carregar dados do usuário para edição.');
        }
    }

    /**
     * Limpa o formulário e reseta para o modo "Criar"
     */
    function resetarFormulario() {
        userForm.reset(); // Limpa os campos
        userIdField.value = ''; // Garante que o ID oculto está limpo
        passwordField.placeholder = "Obrigatório apenas ao criar";
        passwordField.required = true; // Senha volta a ser obrigatória

        formTitle.textContent = 'Cadastrar Novo Usuário';
        submitButton.textContent = 'Salvar';
        cancelButton.style.display = 'none'; // Esconde o botão de cancelar
    }

    /**
     * Lida com o envio do formulário (Criar ou Atualizar)
     */
    async function handleFormSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const id = userIdField.value;
        const name = nameField.value;
        const email = emailField.value;
        const password = passwordField.value;

        const isUpdating = !!id; // Se tem ID, está atualizando

        const url = isUpdating ? `${API_URL}/${id}` : API_URL;
        const method = isUpdating ? 'PUT' : 'POST';

        // Monta o corpo (payload) da requisição
        const bodyPayload = { name, email };
        // Só envia a senha se for uma criação ou se o usuário digitou uma nova senha na edição
        if (!isUpdating || (isUpdating && password)) {
            bodyPayload.password = password;
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao salvar usuário');
            }

            alert(`Usuário ${isUpdating ? 'atualizado' : 'criado'} com sucesso!`);
            resetarFormulario();
            carregarUsuarios(); // Recarrega a lista

        } catch (error) {
            console.error(error);
            alert(`Erro: ${error.message}`);
        }
    }

    /**
     * Lida com cliques na tabela (para botões de Editar e Excluir)
     */
    function handleTableClick(event) {
        const target = event.target;
        const id = target.dataset.id;

        if (target.classList.contains('btn-edit')) {
            preencherFormularioParaEdicao(id);
        }
        
        if (target.classList.contains('btn-delete')) {
            deletarUsuario(id);
        }
    }

    /**
     * Deleta um usuário
     */
    async function deletarUsuario(id) {
        if (!confirm(`Tem certeza que deseja excluir o usuário ID ${id}?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) // status 204 também é 'ok'
                throw new Error('Falha ao deletar usuário');

            alert('Usuário deletado com sucesso!');
            carregarUsuarios(); // Recarrega a lista

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    // --- INICIALIZAÇÃO E EVENT LISTENERS ---
    
    userForm.addEventListener('submit', handleFormSubmit);
    userTbody.addEventListener('click', handleTableClick);
    cancelButton.addEventListener('click', resetarFormulario);

    // Carrega os usuários assim que a página é aberta
    carregarUsuarios();
});