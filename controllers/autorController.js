// No seu controller
const Autor = require('../models/Autor');
const Livro = require('../models/Livro');

module.exports = {
    async listarAutores(req, res) {
        try {
          const autores = await Autor.findAll();
      
          if (!autores || autores.length === 0) {
            res.send('<p>Não existem autores cadastrados.</p>');
          } else {
            let html = '<table>';
            html += '<thead><tr><th>Id</th><th>Nome</th><th>Nacionalidade</th><th>Ações</th></tr></thead>';
            html += '<tbody>';
      
            autores.forEach(autor => {
              html += `<tr><td>${autor.id}</td><td><a href="/livrosPorAutor/${autor.id}">${autor.nome}</a></td><td>${autor.nacionalidade}</td><td><a href="/editarAutor/${autor.id}">Editar</a> | <a href="/excluirAutor/${autor.id}">Excluir</a></td></tr>`;
            });
      
            html += '</tbody></table>';
      
            // Adicionar botão "Adicionar Autor"
            html += '<a href="/adicionarAutor">Adicionar Autor</a>';
      
            res.send(html);
          }
        } catch (error) {
          res.status(400).json({ error });
        }
      },
      
      

  async editarAutor(req, res) {
    try {
      const autorId = req.params.id;
      const autor = await Autor.findById(autorId);

      if (!autor) {
        res.status(404).send('<p>Autor não encontrado</p>');
        return;
      }

      res.send(`
        <h1>Editar Autor</h1>
        <form action="/atualizarAutor/${autorId}" method="POST">
          <label for="nome">Nome:</label>
          <input type="text" name="nome" id="nome" value="${autor.nome}"><br>

          <label for="nacionalidade">Nacionalidade:</label>
          <input type="text" name="nacionalidade" id="nacionalidade" value="${autor.nacionalidade}"><br>

          <button type="submit">Atualizar</button>
        </form>
      `);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async atualizarAutor(req, res) {
    try {
      const autorId = req.params.id;
      const { nome, nacionalidade } = req.body;

      await Autor.update(autorId, nome, nacionalidade);

      res.redirect('/listarAutores');
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async adicionarAutor(req, res) {
    try {
      const { nome, nacionalidade } = req.body;

      const autorId = await Autor.create(nome, nacionalidade);

      res.redirect('/listarAutores');
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async excluirAutor(req, res) {
    try {
      const autorId = req.params.id;

      await Autor.deleteById(autorId);

      res.redirect('/listarAutores');
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async listarLivrosPorAutor(req, res) {
    try {
      const autorId = req.params.autorId;
  
      // Aqui você deve implementar a lógica para obter os livros do autor com base no autorId
      // Por exemplo:
      const livros = await Livro.findAllByAutorId(autorId);
  
      if (!livros || livros.length === 0) {
        res.send('<p>Não existem livros cadastrados para este autor.</p>');
      } else {
        let html = '<ul>';
  
        livros.forEach(livro => {
          html += `<li>${livro.titulo}</li>`;
        });
  
        html += '</ul>';
  
        res.send(html);
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  
};
