# Pesquisa sobre Uso de IA no Desenvolvimento Web: Google AntiGravity

**Disciplina:** Programação Web  
**Instituição:** Instituto Federal Sul-rio-grandense (IFSUL) — Câmpus Passo Fundo  
**Docente:** Profª. Jéssica R. Di Domênico  
**Integrantes:** [Nome dos integrantes da dupla / grupo]  
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
Auxilia na criação rápida do *boilerplate* do projeto (geração de arquivos `package.json`, instalação de dependências como `express`, `cors`, `bootstrap` e arquivos de inicialização do servidor).

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
> *"Crie a base de uma aplicação web full-stack para uma Lista Telefônica (com cadastro de nome, telefone e e-mail). No backend (Node.js/Express), implemente um CRUD completo com os métodos HTTP (GET, POST, PUT, DELETE). Para fins de teste e demonstração rápida, armazene os contatos em um vetor/array em memória. No frontend (React com React-Bootstrap), crie a interface com formulário para adicionar/editar contatos e uma tabela para listagem e remoção."*

---

### A) Estrutura de Pastas Gerada pela IA
<!-- COLOGUEM AQUI A ÁRVORE DE PASTAS GERADA PELO ANTIGRAVITY OU MANTENHAM ESTE MODELO -->
```text
lista-telefonica/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── contatoController.js
│   │   └── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── FormContato.jsx
    │   │   └── TabelaContatos.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

### B) Trechos de Código Gerados

#### 1. Backend: Controlador da API REST com Vetor em Memória (`contatoController.js`)
<!-- COLOGUEM O CÓDIGO GERADO PELA IA PARA O BACKEND AQUI -->

```javascript
// [Cole aqui o código do controller com os métodos GET, POST, PUT e DELETE]
```

#### 2. Frontend: Componente de Interface em React (`TabelaContatos.jsx` / `App.jsx`)
<!-- COLOGUEM O CÓDIGO GERADO PELA IA PARA O FRONTEND AQUI -->

```jsx
// [Cole aqui o código do componente React responsável pela interface]
```

---

### C) Teste de Correção de Erros (Debugging)
> **Prompt de Ajuste/Fix enviado à IA:**  
> *"O frontend apresentou erro de integração via CORS ao tentar realizar uma requisição POST para a API na porta 5000. Ajuste a configuração do servidor Express para liberar o acesso."*

#### Solução Aplicada pela IA:
<!-- COLOGUEM O TRECHO DE CÓDIGO COM O CORS CORRIGIDO AQUI -->

```javascript
// [Cole aqui o trecho corrigido do server.js]
```

---

## 4. Vantagens vs. Limitações do Google AntiGravity

### Vantagens:
- **Ganho de Produtividade:** Geração rápida de rotas e componentes funcionais sem necessidade de escrita manual repetitiva.
- **Entendimento de Contexto:** Capacidade de relacionar arquivos do *frontend* e *backend* no mesmo espaço de trabalho.
- **Independência de Ambiente Externo:** Facilidade em gerar estruturas mockadas para testes ágeis de APIs.
- **Suporte ao Debugging:** Resolução rápida para falhas de configuração e sintaxe.

### Limitações:
- **Persistência Volátil:** Em cenários de teste com vetor em memória, os dados são perdidos quando o servidor é reiniciado (requer banco de dados para produção).
- **Necessidade de Validação:** Possibilidade de a IA sugerir sintaxes obsoletas ou negligenciar validações de dados rigorosas se não explicitadas no *prompt*.
- **Dependência da Clareza dos Prompts:** A precisão do código gerado depende diretamente de quão detalhada é a solicitação do usuário.

---

## 5. Conclusão
O **Google AntiGravity** no VS Code demonstra o avanço do conceito de *Engenharia de Software Aumentada por IA*. Na prática, a ferramenta atua como um assistente eficiente, transferindo o papel principal do desenvolvedor de apenas escrever código sintático para **planejar a arquitetura, elaborar prompts assertivos e validar os resultados gerados**.