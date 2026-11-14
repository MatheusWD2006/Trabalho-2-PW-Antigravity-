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
