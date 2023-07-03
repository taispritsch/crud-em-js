const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = (tela_livro) => {
    const dbClient = readClient()
    dbClient.splice(tela_livro, 1)
    setLocalStorage(dbClient)
}

const updateClient = (tela_livro, client) => {
    const dbClient = readClient()
    dbClient[tela_livro] = client
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
    document.getElementById('nome').dataset.tela_livro = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const tela_livro = document.getElementById('nome').dataset.tela_livro
        if (tela_livro == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(tela_livro, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, tela_livro) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${tela_livro}">Editar</button>
            <button type="button" class="button red" id="delete-${tela_livro}" >Excluir</button>
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
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.tela_livro = client.tela_livro
}

const editClient = (tela_livro) => {
    const client = readClient()[tela_livro]
    client.tela_livro = tela_livro
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${client.nome}`
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, tela_livro] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(tela_livro)
        } else {
            const client = readClient()[tela_livro]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(tela_livro)
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