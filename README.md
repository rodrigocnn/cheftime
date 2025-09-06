# 📌 Plataforma de Reservas

Uma aplicação **Node.js + TypeScript** para gerenciar **clientes** e **reservas**, com autenticação de usuários e persistência em banco de dados via **Prisma + PostgreSQL**.

---

## 🚀 Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Zod para validação
- Jest para testes automatizados

---

## 📂 Estrutura de Pastas

src/  
├── controllers/ # Lógica dos endpoints  
├── services/ # Regras de negócio  
├── repositories/ # Comunicação com o Prisma  
├── dtos/ # Data Transfer Objects  
├── validations/ # Schemas Zod  
├── middlewares/ # Tratamento de erros, autenticação  
└── routes/ # Rotas da aplicação

---

## ⚙️ Instalação e Configuração

1. Clone o repositório:

git clone https://github.com/seu-repo/plataforma-reservas.git  
cd plataforma-reservas

2. Instale as dependências:

yarn install

3. Configure o banco de dados no arquivo **.env**:

DATABASE_URL="postgresql://user:password@localhost:5432/reservas"  
JWT_SECRET="sua_chave_secreta"

4. Rode as migrations do Prisma:

yarn prisma migrate dev --name init

---

## ▶️ Executando o Projeto

Rodar em ambiente de desenvolvimento:

yarn dev

Rodar em produção:

yarn build  
yarn start

---

## 📡 Exemplos de Uso (Endpoints)

### Criar Cliente

POST /clients  
Content-Type: application/json

{  
 "name": "Rodrigo César",  
 "email": "rodrigo@exemplo.com",  
 "birth": "1985-05-01",  
 "phone": "(11) 99999-9999"  
}

### Criar Reserva

POST /reservations  
Authorization: Bearer <token>  
Content-Type: application/json

{  
 "dateTime": "2025-09-01T19:00:00.000Z",  
 "clientId": "uuid-cliente"  
}

### Listar Reservas

GET /reservations  
Authorization: Bearer <token>

---

## 🧪 Testes

Rodar os testes automatizados com Jest:

yarn test

Rodar com coverage:

yarn test --coverage

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, modificar e compartilhar.
