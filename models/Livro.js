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
  constructor(titulo, editora, qtdExemplar, autor_id) {
    this.titulo = titulo;
    this.editora = editora;
    this.qtdExemplar = qtdExemplar;
    this.autor_id = autor_id;
  }

  static create(titulo, editora, qtdExemplar, autor_id) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO livraria (titulo, editora, qtdExemplar, autor_id) VALUES (?, ?, ?, ?)';
      connection.query(sql, [titulo, editora, qtdExemplar, autor_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
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

  static findAllByAutorId(autorId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM livraria WHERE autor_id = ?';
      connection.query(sql, [autorId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static findById(codLivro) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM livraria WHERE codLivro = ?';
      connection.query(sql, [codLivro], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject(new Error('Livro não encontrado'));
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static update(codLivro, titulo, editora, qtdExemplar, autor_id) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE livraria SET titulo = ?, editora = ?, qtdExemplar = ?, autor_id = ? WHERE codLivro = ?';
      connection.query(sql, [titulo, editora, qtdExemplar, autor_id, codLivro], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  
  static deleteById(codLivro) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM livraria WHERE codLivro = ?';
      connection.query(sql, [codLivro], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  
}

module.exports = Livro;
