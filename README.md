# Backend-SaaS-NestJS 

Codificação de aplicação para SaaS para uma solução Backend com uso de Framework NestJS e programado em Typescript  robusta construída com NestJS para aplicações SaaS (Software as a Service).
Para o desenvolvimento foi utilizado Banco de dados Mysql para gravar dados juntamente com Prisma para fazer implementação de Migrations e facilitar abstração de código e gerenciamento de Dados. Também utilizado Kafka para gravar Streaming de Dados para aplicação.


#### Requisitos de Software para a Aplicação Backend-SaaS-NestJS:
Sistema Operacional:

- Linux (Ubuntu 20.04 LTS ou superior recomendado) ou
- Windows 10 com WSL (Windows Subsystem for Linux) ou
- macOS Catalina ou superior.


#### Node.js (versão 14 ou superior).
npm (geralmente vem com o Node.js) ou yarn.
Framework e Bibliotecas:

#### NestJS (última versão).
- kafkajs (para integração com Kafka).
- uuid (para geração de IDs únicos).

#### Prisma

- Prisma Client:
- É um query builder auto-gerado para Node.js e TypeScript.
- Ele fornece uma API de acesso a dados segura e rica em tipos para consultar seu banco de dados.
- É gerado a partir do modelo de dados definido no Prisma Schema.


#### Apache Kafka (última versão estável).
Banco de Dados (se aplicável, pois não foi mencionado explicitamente nos códigos fornecidos):

#### Um sistema de gerenciamento de banco de dados relacional (MySQL) ou
Um banco de dados NoSQL (por exemplo, MongoDB) dependendo da estrutura de dados e das necessidades da aplicação.


#### Docker (opcional, mas recomendado para containerização e implantação).
#### Postman (para testar endpoints da API).

#### Como rodar aplicação:

- npm install
- npm install prisma
- npm install uuid
- npm run start

#### Subir as Migrations:
npx prisma migrate dev --name init

npx prisma migrate deploy

#### Aqui estão alguns comandos adicionais que você pode usar para trabalhar com o Prisma:

- prisma generate - Gera o Prisma Client com base no arquivo schema.prisma.
- prisma migrate dev - Cria uma migração para atualizar o banco de dados com base nas alterações feitas no arquivo schema.prisma.
- prisma db push - Aplica uma migração ao banco de dados.


#### Com Docker rode:

- docker-compose up

```bash
# Endpoints da API

#### API de Códigos

#### Criar um novo código

curl -X POST http://localhost:3000/codes \
     -H "Content-Type: application/json" \
     -d '{"question": "Sua pergunta aqui"}'

#### Obter todos os códigos
curl -X GET http://localhost:3000/codes

#### Obter um código específico por ID
## Substitua <ID> pelo ID real do código.

curl -X GET http://localhost:3000/codes/<ID>

#### Atualizar um código específico por ID
#### Substitua <ID> pelo ID real do código e forneça a pergunta atualizada.

curl -X PUT http://localhost:3000/codes/<ID> \
     -H "Content-Type: application/json" \
     -d '{"question": "Pergunta atualizada aqui"}'

#### Deletar um código específico por ID
#### Substitua <ID> pelo ID real do código.

curl -X DELETE http://localhost:3000/codes/<ID>



## API de Conversas

#### Criar uma nova conversa

curl -X POST http://localhost:3000/conversation \
     -H "Content-Type: application/json" \
     -d '{"prompts": ["Primeira mensagem", "Segunda mensagem"]}'

## Adicionar resposta a uma conversa existente
## Substitua <ID> pelo ID real da conversa.

curl -X POST http://localhost:3000/conversation/<ID>/response \
     -H "Content-Type: application/json" \
     -d '{"response": "Resposta à conversa"}'

#### Obter uma conversa específica por ID
#### Substitua <ID> pelo ID real da conversa.

curl -X GET http://localhost:3000/conversation/<ID>



## API de Geração de Imagens

#### Gerar uma nova imagem

curl -X POST http://localhost:3000/image-generation/generate \
     -H "Content-Type: application/json" \
     -d '{
           "prompts": ["Prompt 1", "Prompt 2"],
           "photoCount": 5,
           "photoSize": "large"
         }'

#### Obter uma imagem específica por ID
#### Substitua <ID> pelo ID real da imagem.

curl -X GET http://localhost:3000/image-generation/<ID>

#### Obter todas as imagens

curl -X GET http://localhost:3000/image-generation

#### Deletar uma imagem específica por ID
#### Substitua <ID> pelo ID real da imagem.

curl -X DELETE http://localhost:3000/image-generation/<ID>



## API de Música

#### Gerar uma nova música

curl -X POST http://localhost:3000/music/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Seu prompt aqui"}'

#### Obter uma música específica por ID
#### Substitua <ID> pelo ID real da música.

curl -X GET http://localhost:3000/music/<ID>

#### Obter todas as músicas
curl -X GET http://localhost:3000/music

#### Pesquisar músicas por query
#### Substitua <QUERY> pela sua consulta de pesquisa.

curl -X GET http://localhost:3000/music/search/<QUERY>

#### Tocar uma música específica por ID
#### Substitua <ID> pelo ID real da música.

curl -X GET http://localhost:3000/music/<ID>/play

#### Curtir uma música específica por ID
#### Substitua <ID> pelo ID real da música.

curl -X GET http://localhost:3000/music/<ID>/like

#### Não curtir uma música específica por ID
#### Substitua <ID> pelo ID real da música.

curl -X GET http://localhost:3000/music/<ID>/dislike



## API de Pagamentos

#### Criar um novo pagamento

curl -X POST http://localhost:3000/pay \
     -H "Content-Type: application/json" \
     -d '{
           "amount": 100.50,
           "method": "pix",
           ... (outros campos do DTO de pagamento)
         }'

#### Obter um pagamento específico por ID
#### Substitua <ID> pelo ID real do pagamento.

curl -X GET http://localhost:3000/pay/<ID>

#### Obter todos os pagamentos
curl -X GET http://localhost:3000/pay

#### Atualizar um pagamento específico por ID
#### Substitua <ID> pelo ID real do pagamento e forneça os dados atualizados.
curl -X PUT http://localhost:3000/pay/<ID> \
     -H "Content-Type: application/json" \
     -d '{
           "amount": 150.75,
           "method": "credit-card",
           ... (outros campos atualizados do DTO de pagamento)
         }'

#### Deletar um pagamento específico por ID
#### Substitua <ID> pelo ID real do pagamento.
curl -X DELETE http://localhost:3000/pay/<ID>




## API de Vídeos

#### Gerar um novo vídeo
curl -X POST http://localhost:3000/video/generate \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Seu prompt aqui para gerar o vídeo"}'

#### Obter um vídeo específico por ID
#### Substitua <ID> pelo ID real do vídeo.
curl -X GET http://localhost:3000/video/<ID>

#### Obter todos os vídeos

curl -X GET http://localhost:3000/video

#### Atualizar um vídeo específico por ID
#### Substitua <ID> pelo ID real do vídeo e forneça os dados atualizados.

curl -X PUT http://localhost:3000/video/<ID> \
     -H "Content-Type: application/json" \
     -d '{
           "title": "Título atualizado", 
           "description": "Descrição atualizada", 
           "videoLink": "Link do vídeo atualizado",
           ... (outros campos do modelo de vídeo conforme necessário)
         }'

#### Deletar um vídeo específico por ID
#### Substitua <ID> pelo ID real do vídeo.

curl -X DELETE http://localhost:3000/video/<ID>

```




## Autor:
Emerson Amorim

