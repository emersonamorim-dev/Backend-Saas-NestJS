import { Injectable } from '@nestjs/common';
import { Producer, Kafka, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'code-service',
      brokers: ['localhost:9092'], // Insira seus brokers do Kafka aqui
    });

    this.producer = kafka.producer();
  }

  async sendToTopic(topic: string, message: any): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await this.producer.disconnect();
  }
}
