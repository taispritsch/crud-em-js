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
          html += `<tr><td>${livro.codLivro}</td><td>${livro.titulo}</td><td>${livro.editora}</td><td>${livro.autor_id}</td><td>${livro.qtdExemplar}</td><td><a href="/editarLivro/${livro.codLivro}">Editar</a> | <a href="/excluirLivro/${livro.codLivro}">Excluir</a></td></tr>`;
        });

        html += '</tbody></table>';

        // Adicionar botão "Adicionar Livro"
        html += '<a href="/adicionarLivro">Adicionar Livro</a>';

        res.send(html);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async editarLivro(req, res) {
    try {
      const livroId = req.params.id;
      const livro = await Livro.findById(livroId);

      if (!livro) {
        res.status(404).send('<p>Livro não encontrado</p>');
        return;
      }

      res.send(`
        <h1>Editar Livro</h1>
        <form action="/atualizarLivro/${livroId}" method="POST">
          <label for="titulo">Titulo:</label>
          <input type="text" name="titulo" id="titulo" value="${livro.titulo}"><br>

          <label for="editora">Editora:</label>
          <input type="text" name="editora" id="editora" value="${livro.editora}"><br>

          <label for="qtdExemplar">Quantidade Exemplar:</label>
          <input type="number" name="qtdExemplar" id="qtdExemplar" value="${livro.qtdExemplar}"><br>

          <label for="autor_id">Autor ID:</label>
          <input type="number" name="autor_id" id="autor_id" value="${livro.autor_id}"><br>

          <button type="submit">Atualizar</button>
        </form>
      `);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async atualizarLivro(req, res) {
    try {
      const livroId = req.params.id;
      const { titulo, editora, qtdExemplar, autor_id } = req.body;

      await Livro.update(livroId, titulo, editora, qtdExemplar, autor_id);

      res.redirect('/listarLivros');
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  

  async adicionarLivro(req, res) {
    try {
      const { titulo, editora, qtdExemplar, autor_id } = req.body;

      const livroId = await Livro.create(titulo, editora, qtdExemplar, autor_id);

      res.redirect('/listarLivros');
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async excluirLivro(req, res) {
    try {
      const livroId = req.params.id;

      await Livro.deleteById(livroId);

      res.redirect('/listarLivros');
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
