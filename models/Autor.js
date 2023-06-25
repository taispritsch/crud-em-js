// Livro.js
const mysql = require('mysql');

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'tais',
    password: 'tais1234',
    database: 'livraria',
});

class Autor {
  constructor(nome, nacionalidade) {
    this.nome = nome;
    this.nacionalidade = nacionalidade;
  }

  static create(nome, nacionalidade) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO autores (nome, nacionalidade) VALUES (?, ?)';
      connection.query(sql, [nome, nacionalidade], (error, results) => {
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
      const sql = 'SELECT * FROM autores';
      connection.query(sql, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM autores WHERE id = ?';
      connection.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject(new Error('Autor não encontrado'));
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static update(id, nome, nacionalidade) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE autores SET nome = ?, nacionalidade = ? WHERE id = ?';
      connection.query(sql, [nome, nacionalidade, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static deleteById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM autores WHERE id = ?';
      connection.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
  
}

module.exports = Autor;
