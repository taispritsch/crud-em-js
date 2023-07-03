const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (tela_autor) => {
    const dbClient = readClient()
    dbClient.splice(tela_autor, 1)
    setLocalStorage(dbClient)
}

const updateClient = (tela_autor, client) => {
    const dbClient = readClient()
    dbClient[tela_autor] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.tela_autor = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            cidade: document.getElementById('cidade').value
        }
        const tela_autor = document.getElementById('nome').dataset.tela_autor
        if (tela_autor == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(tela_autor, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, tela_autor) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${tela_autor}">Editar</button>
            <button type="button" class="button red" id="delete-${tela_autor}" >Excluir</button>
            <button type="button" class="button orange" id="troca-${tela_autor}" >Ver Livros</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.tela_autor = client.tela_autor
}

const editClient = (tela_autor) => {
    const client = readClient()[tela_autor]
    client.tela_autor = tela_autor
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${client.nome}`
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, tela_autor] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(tela_autor)
        } else {
            const client = readClient()[tela_autor]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(tela_autor)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)