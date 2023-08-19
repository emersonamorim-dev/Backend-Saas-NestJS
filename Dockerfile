FROM node:14

# Crie um diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

# Expõe a porta em que o NestJS está configurado para ouvir (por padrão, a porta 3000)
EXPOSE 3000

# Comando para iniciar o servidor NestJS
CMD ["npm", "start"]
