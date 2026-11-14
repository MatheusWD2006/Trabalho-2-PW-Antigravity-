const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Vetor de contatos em memória
let contatos = [
  { id: 1, nome: 'João Silva', telefone: '(11) 98765-4321' },
  { id: 2, nome: 'Maria Oliveira', telefone: '(21) 91234-5678' },
  { id: 3, nome: 'Carlos Souza', telefone: '(31) 99876-5432' }
];

let proximoId = 4;

// GET - Listar todos os contatos
app.get('/contatos', (req, res) => {
  res.json(contatos);
});

// GET - Buscar um contato por ID
app.get('/contatos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const contato = contatos.find((c) => c.id === id);
  if (!contato) {
    return res.status(404).json({ mensagem: 'Contato não encontrado.' });
  }
  res.json(contato);
});

// POST - Adicionar novo contato
app.post('/contatos', (req, res) => {
  const { nome, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ mensagem: 'Nome e telefone são obrigatórios.' });
  }

  const novoContato = {
    id: proximoId++,
    nome: nome.trim(),
    telefone: telefone.trim()
  };

  contatos.push(novoContato);
  res.status(201).json(novoContato);
});

// PUT - Atualizar contato existente
app.put('/contatos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nome, telefone } = req.body;

  const index = contatos.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Contato não encontrado.' });
  }

  if (!nome || !telefone) {
    return res.status(400).json({ mensagem: 'Nome e telefone são obrigatórios.' });
  }

  contatos[index] = {
    ...contatos[index],
    nome: nome.trim(),
    telefone: telefone.trim()
  };

  res.json(contatos[index]);
});

// DELETE - Excluir contato
app.delete('/contatos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = contatos.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Contato não encontrado.' });
  }

  const contatoRemovido = contatos.splice(index, 1)[0];
  res.json({ mensagem: 'Contato excluído com sucesso.', contato: contatoRemovido });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
