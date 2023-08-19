import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config(); // Carregue as variáveis de ambiente do arquivo .env

  const app = await NestFactory.create(AppModule);

  // Obtenha a porta definida no arquivo .env ou use 3000 como padrão
  const port = process.env.PORT || 3000;

  // Inicie o servidor e armazene a instância do servidor retornada
  const server = await app.listen(port);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);

  // Exibe a porta em que o servidor está ouvindo
  console.log(`Server is running on port: ${port}`);


}

bootstrap();