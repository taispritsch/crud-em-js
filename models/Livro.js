// Livro.js
const mysql = require('mysql');

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tais',
    password: 'tais1234',
    database: 'livraria',
});

class Livro {
  constructor(titulo, editora, autor, qtdExemplar, autor_id) {
    this.titulo = titulo;
    this.editora = editora;
    this.autor = autor;
    this.qtdExemplar = qtdExemplar;
    this.autor_id = autor_id;
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM livraria';
      connection.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
}

module.exports = Livro;
