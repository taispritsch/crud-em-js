// No seu controller
const Livro = require('../models/Livro');

module.exports = {
  async listarLivros(req, res) {
    try {
      const livros = await Livro.findAll();

      if (!livros || livros.length === 0) {
        res.send('<p>Não existem livros cadastrados.</p>');
      } else {
        let html = '<table>';
        html += '<thead><tr><th>Id</th><th>Título</th><th>Editora</th><th>Autor</th><th>Quantidade de Exemplares</th></tr></thead>';
        html += '<tbody>';

        livros.forEach(livro => {
          html += `<tr><td>${livro.codLivro}</td><td>${livro.titulo}</td><td>${livro.editora}</td><td>${livro.autor}</td><td>${livro.qtdExemplar}</td></tr>`;
        });

        html += '</tbody></table>';

        res.send(html);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
