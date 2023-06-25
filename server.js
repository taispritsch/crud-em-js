const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const LivroController = require('./controllers/livroController');
const AutorController = require('./controllers/autorController');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tais',
  password: 'tais1234',
  database: 'livraria',
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar com o MySQL:', error);
  } else {
    console.log('Conexão com o MySQL estabelecida');
  }
});

// Rota para exibir o formulário de adicionar um autor
app.get('/adicionarAutor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adicionarAutor.html'));
});

// Rota para adicionar um autor
app.post('/criarAutor', AutorController.adicionarAutor);

// Rota para listar os livros - NAO ESTA SENDO USADA NO MOMENTO
app.get('/listarLivros', LivroController.listarLivros);

// Rota para listar os autores
app.get('/listarAutores', AutorController.listarAutores);

// Rota para editar um autor
app.get('/editarAutor/:id', AutorController.editarAutor);

// Rota para atualizar um autor
app.post('/atualizarAutor/:id', AutorController.atualizarAutor);

// Rota para excluir um autor
app.get('/excluirAutor/:id', AutorController.excluirAutor);


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
