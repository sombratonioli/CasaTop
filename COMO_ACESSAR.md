# Bem-vindo ao CasaTop

Este é o documento de referência para acessar os projetos do monorepo em ambiente de desenvolvimento local.

## 🔗 Links Rápidos de Acesso

### Frontend (Next.js)
- **App Principal:** [http://localhost:3000](http://localhost:3000)
- **Aplicação da Dispensa:** [http://localhost:3000/dispensa](http://localhost:3000/dispensa)

### Backend (Django & Django Ninja)
- **API Base:** [http://localhost:8000/api/](http://localhost:8000/api/)
- **Documentação Interativa (Swagger):** [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
- **Painel Administrativo (Django Admin):** [http://localhost:8000/admin](http://localhost:8000/admin)

---

## 🚀 Como Executar o Projeto Localmente

Para iniciar a aplicação completa em ambiente de desenvolvimento, você precisará de dois terminais abertos simultaneamente.

### Terminal 1: Iniciando o Backend
Abra um terminal, acesse a pasta `backend` e inicie o servidor do Django:
```bash
cd backend
python manage.py runserver
```
*(O backend ficará rodando na porta 8000)*

### Terminal 2: Iniciando o Frontend
Em outro terminal, acesse a pasta `frontend` e inicie o servidor do Next.js:
```bash
cd frontend
npm run dev
```
*(O frontend ficará rodando na porta 3000)*

Após inicializar ambos os servidores, basta clicar nos links rápidos acima para testar as aplicações.
