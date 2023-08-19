import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ConversationService } from '../service/conversation.service';
import { Conversation } from '../model/Conversation';
import { Kafka, Producer } from 'kafkajs'; // Importe o Kafka e o Producer

@Controller('conversation')
export class ConversationController {
  private producer: Producer; // Declare o produtor Kafka

  constructor(private readonly conversationService: ConversationService) {
    // Configuração do Kafka
    const kafka = new Kafka({
      clientId: 'conversation-service',
      brokers: ['localhost:9092'], // Substitua pela URL do seu servidor Kafka
    });

    // Crie um produtor Kafka
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    // Conecte o produtor ao Kafka
    await this.producer.connect();
  }

  @Post()
  async createConversation(@Body('prompts') prompts: string[]): Promise<Conversation> {
    const conversation = this.conversationService.createConversation(prompts);

    // Envie a conversa para um tópico Kafka
    await this.producer.send({
      topic: 'new_conversation', // Substitua pelo nome do tópico Kafka
      messages: [
        {
          key: conversation.id, // Use o ID da conversa como chave (opcional)
          value: JSON.stringify(conversation), // Envie a conversa como valor
        },
      ],
    });

    return conversation;
  }

  @Post(':id/response')
  async addResponseToConversation(
    @Param('id') id: string,
    @Body('response') response: string,
  ): Promise<Conversation> {
    const conversation = this.conversationService.addResponseToConversation(id, response);

    // Envie a conversa atualizada para o mesmo tópico Kafka
    await this.producer.send({
      topic: 'new_conversation',
      messages: [
        {
          key: conversation.id,
          value: JSON.stringify(conversation),
        },
      ],
    });

    return conversation;
  }

  @Get(':id')
  getConversation(@Param('id') id: string): Conversation {
    return this.conversationService.getConversationById(id);
  }

  async onModuleDestroy() {
    // Desconecte o produtor Kafka ao encerrar o aplicativo
    await this.producer.disconnect();
  }
}


