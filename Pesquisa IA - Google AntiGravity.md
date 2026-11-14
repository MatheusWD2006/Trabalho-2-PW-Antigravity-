# Pesquisa sobre Uso de IA no Desenvolvimento Web: Google AntiGravity

**Disciplina:** Programação Web  
**Instituição:** Instituto Federal Sul-rio-grandense (IFSUL) — Câmpus Passo Fundo  
**Docente:** Profª. Jéssica R. Di Domênico  
**Integrantes:** Matheus Witte Ditz e Gabriel Rizzato  
**Data:** 19/11/2026  

---

## 1. Introdução e Visão Geral
O **Google AntiGravity** é um agente/extensão de inteligência artificial voltado para o ambiente de desenvolvimento **Visual Studio Code (VS Code)**. Seu objetivo principal é atuar de forma contextual no repositório, auxiliando em todas as etapas do ciclo de desenvolvimento de software (*full-stack*).

### Funcionalidades e Características Principais:
- **Análise Contextual de Repositório:** Leitura e interpretação da estrutura de pastas, arquivos de configuração (`package.json`, `.env`), dependências e integrações existentes.
- **Automação no Editor:** Capacidade de gerar, modificar e refatorar arquivos diretamente no ambiente do VS Code.
- **Suporte ao Fluxo Full-Stack:** Integração e criação contínua entre regras do *backend* (Node.js/Express) e interfaces do *frontend* (React).
- **Apoio ao Debugging:** Diagnóstico em tempo real de mensagens de erro emitidas pelo console ou terminal.

---

## 2. Aplicações nos Processos de Desenvolvimento

### A) Configuração do Projeto e Setup Inicial
Auxilia na criação rápida do *boilerplate* do projeto (geração de arquivos `package.json`, instalação de dependências como `express`, `cors`, bibliotecas de estilo e arquivos de inicialização do servidor).

### B) Desenvolvimento Geral (Criação de Código)
Geração autônoma de rotas de API REST (*endpoints* `GET`, `POST`, `PUT`, `DELETE`) e componentes visuais interativos no React a partir de *prompts* orientados em linguagem natural.

### C) Correção de Erros e Debugging
Identificação de falhas de comunicação entre *frontend* e *backend* (como políticas de CORS ou erros de porta) e correção de trechos de sintaxe inválidos no JSX ou JavaScript.

### D) Gestão e Atualização de Bibliotecas
Análise do repositório para sugestão de atualizações de pacotes e manutenção da compatibilidade entre dependências instaladas.

---

## 3. Teste Prático: Aplicação de Lista Telefônica (Dados Mockados)

Para demonstrar os métodos HTTP da API REST sem a necessidade de configurar e gerenciar um banco de dados relacional durante a apresentação, solicitou-se à IA a construção de uma **Lista Telefônica** utilizando armazenamento em memória (*vetor/array local*).

### Prompt Utilizado no Google AntiGravity:
> "Crie uma aplicação web completa de Lista Telefônica dentro desta pasta raiz, dividindo o projeto em duas subpastas: `backend` e `frontend`.
> 
> 1. Na pasta `backend`, inicialize um projeto Node.js com Express e CORS, criando uma API REST com CRUD completo (GET, POST, PUT, DELETE) salvando os contatos (nome e telefone) em um vetor em memória (sem banco de dados). Configure o servidor para rodar na porta 5000 (para não conflitar com o React).
> 2. Na pasta `frontend`, crie um projeto React padrão utilizando `npx create-react-app frontend` (NÃO utilize Vite). Implemente uma interface simples em JavaScript puro (`.js`) que consuma a API do backend para listar, adicionar, editar e excluir contatos.
> 3. Instale todas as dependências necessárias nas duas pastas (NÃO instale o nodemon ainda).
> 4. Configuração do Git: Esta pasta raiz já é o repositório Git principal do projeto. Remova qualquer pasta `.git` interna que seja criada dentro de `frontend` ou `backend` e crie um arquivo `.gitignore` na pasta raiz ignorando `node_modules/`, `.env` e `build/`.
> 
> Ao final, me informe os comandos para iniciar os dois servidores."

---

### A) Estrutura de Pastas Gerada pela IA
```text
Trabalho-2-PW-Antigravity-/
├── .gitignore
├── Pesquisa IA - Google AntiGravity.md
├── README.md
├── roteiro_de_prompts_google_antigravity.txt
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   ├── reportWebVitals.js
    │   └── setupTests.js
    └── node_modules/
```

---

### B) Códigos Gerados

#### 1. Backend (`backend/index.js`)
Configuração do servidor Express rodando na **porta 5000** com suporte a CORS e CRUD completo em memória:

```javascript
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
```

#### 2. Frontend: Componente de Interface em React (`frontend/src/App.js`)
Componente React com interface para listar, cadastrar, editar e remover contatos via API:

```jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/contatos';

function App() {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contatoEmEdicao, setContatoEmEdicao] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Carregar contatos ao montar o componente
  useEffect(() => {
    carregarContatos();
  }, []);

  const carregarContatos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erro ao buscar contatos.');
      }
      const data = await response.json();
      setContatos(data);
    } catch (err) {
      console.error(err);
      setErro('Não foi possível conectar ao servidor backend (porta 5000).');
    }
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    if (!nome.trim() || !telefone.trim()) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (contatoEmEdicao) {
        // Atualizar contato existente (PUT)
        const response = await fetch(`${API_URL}/${contatoEmEdicao.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, telefone })
        });

        if (!response.ok) {
          throw new Error('Falha ao atualizar contato.');
        }

        setMensagem('Contato atualizado com sucesso!');
        setContatoEmEdicao(null);
      } else {
        // Adicionar novo contato (POST)
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, telefone })
        });

        if (!response.ok) {
          throw new Error('Falha ao adicionar contato.');
        }

        setMensagem('Contato adicionado com sucesso!');
      }

      setNome('');
      setTelefone('');
      carregarContatos();
    } catch (err) {
      console.error(err);
      setErro('Erro ao salvar contato.');
    }
  };

  const handleEditar = (contato) => {
    setContatoEmEdicao(contato);
    setNome(contato.nome);
    setTelefone(contato.telefone);
    setMensagem('');
    setErro('');
  };

  const handleCancelarEdicao = () => {
    setContatoEmEdicao(null);
    setNome('');
    setTelefone('');
    setMensagem('');
    setErro('');
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este contato?')) {
      return;
    }

    setMensagem('');
    setErro('');

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir contato.');
      }

      setMensagem('Contato excluído com sucesso!');
      if (contatoEmEdicao && contatoEmEdicao.id === id) {
        handleCancelarEdicao();
      }
      carregarContatos();
    } catch (err) {
      console.error(err);
      setErro('Erro ao excluir contato.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📖 Lista Telefônica</h1>
      </header>

      {mensagem && <div className="alerta sucesso">{mensagem}</div>}
      {erro && <div className="alerta erro">{erro}</div>}

      <section className="form-card">
        <h2>{contatoEmEdicao ? 'Editar Contato' : 'Adicionar Contato'}</h2>
        <form onSubmit={handleSalvar} className="form">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              id="telefone"
              type="text"
              placeholder="(XX) XXXXX-XXXX"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div className="botoes-form">
            <button type="submit" className="btn-salvar">
              {contatoEmEdicao ? 'Salvar Alterações' : 'Adicionar Contato'}
            </button>
            {contatoEmEdicao && (
              <button
                type="button"
                className="btn-cancelar"
                onClick={handleCancelarEdicao}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="lista-card">
        <h2>Contatos Cadastrados ({contatos.length})</h2>
        {contatos.length === 0 ? (
          <p className="lista-vazia">Nenhum contato cadastrado no momento.</p>
        ) : (
          <ul className="lista-contatos">
            {contatos.map((contato) => (
              <li key={contato.id} className="contato-item">
                <div className="contato-info">
                  <span className="contato-nome">{contato.nome}</span>
                  <span className="contato-telefone">{contato.telefone}</span>
                </div>
                <div className="contato-acoes">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(contato)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-excluir"
                    onClick={() => handleExcluir(contato.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
```

#### 3. Frontend: Estilização em CSS (`frontend/src/App.css`)
Estilização com design em cartões, campos de formulário, botões de ação e alertas de feedback:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #f4f7f6;
  color: #333;
}

.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 2rem;
}

.alerta {
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 0.95rem;
  text-align: center;
}

.alerta.sucesso {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alerta.erro {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-card,
.lista-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-card h2,
.lista-card h2 {
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.3rem;
  color: #34495e;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 6px;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #555;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #007bff;
}

.botoes-form {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.btn-salvar {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-salvar:hover {
  background-color: #0056b3;
}

.btn-cancelar {
  background-color: #6c757d;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancelar:hover {
  background-color: #5a6268;
}

.lista-vazia {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 20px 0;
}

.lista-contatos {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contato-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  background-color: #fafbfc;
  transition: background-color 0.2s;
}

.contato-item:hover {
  background-color: #f1f3f5;
}

.contato-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.contato-nome {
  font-weight: 600;
  font-size: 1.05rem;
  color: #2c3e50;
}

.contato-telefone {
  font-size: 0.9rem;
  color: #666;
}

.contato-acoes {
  display: flex;
  gap: 8px;
}

.btn-editar {
  background-color: #ffc107;
  color: #212529;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-editar:hover {
  background-color: #e0a800;
}

.btn-excluir {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-excluir:hover {
  background-color: #c82333;
}
```

#### 4. Configurações de Ambiente e Execução
- **Git e Versionamento:** A pasta raiz do repositório foi configurada com o arquivo `.gitignore` ignorando `node_modules/`, `.env` e `build/`. Foi realizada a verificação e garantia de que nenhum repositório `.git` interno foi criado dentro das pastas `frontend` ou `backend` (evitando conflito de submódulos).
- **Execução do Backend (Porta 5000):**
  ```bash
  cd backend
  npm start
  ```
- **Execução do Frontend (Porta 3000):**
  ```bash
  cd frontend
  npm start
  ```

---

## 4. Vantagens vs. Limitações do Google AntiGravity

### Vantagens:
- **Ganho de Produtividade:** Geração rápida de rotas e componentes funcionais sem necessidade de escrita manual repetitiva.
- **Entendimento de Contexto:** Capacidade de relacionar arquivos do *frontend* e *backend* no mesmo espaço de trabalho.
- **Independência de Ambiente Externo:** Facilidade em gerar estruturas mockadas para testes ágeis de APIs.
- **Suporte ao Debugging:** Resolução rápida para falhas de configuração e sintaxe.

### Limitações:
- **Persistência Volátil (em dados mockados):** Ao trabalhar com armazenamento em memória (conforme definido no escopo inicial), o estado é reiniciado junto com a aplicação, exigindo instruções complementares para persistência em banco de dados real.
- **Necessidade de Validação Humana:** Possibilidade de a IA utilizar ferramentas ou pacotes com avisos de depreciação (como o próprio `create-react-app`) ou omitir regras de negócio mais complexas caso o *prompt* não as especifique.
- **Dependência da Clareza dos Prompts:** A precisão do código gerado depende diretamente de quão detalhada, estruturada e assertiva for a solicitação do usuário.

---

## 5. Conclusão
O **Google AntiGravity** no VS Code demonstra o avanço do conceito de *Engenharia de Software Aumentada por IA*. Na prática, a ferramenta atua como um assistente eficiente, transferindo o papel principal do desenvolvedor de apenas escrever código sintático para **planejar a arquitetura, elaborar prompts assertivos e validar os resultados gerados**.