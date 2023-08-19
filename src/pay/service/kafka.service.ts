import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'pay-service',
      brokers: ['localhost:9092'], // ajuste conforme sua configuração
    });
    this.producer = this.kafka.producer();
  }

  async sendKafkaMessage(topic: string, message: any) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await this.producer.disconnect();
  }
}
