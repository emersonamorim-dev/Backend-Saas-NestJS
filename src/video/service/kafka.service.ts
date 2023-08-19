import { Injectable } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  private createProducer() {
    const kafka = new Kafka({
      clientId: 'video-service', // Identificação do cliente Kafka
      brokers: ['localhost:9092'], // Endereço do broker Kafka


    });

    return kafka.producer();
  }

  async sendKafkaMessage(topic: string, message: string): Promise<void> {
    await this.producer.connect();

    const producerRecord: ProducerRecord = {
      topic,
      messages: [{ value: message }],
    };

    await this.producer.send(producerRecord);

    await this.producer.disconnect();
  }
}
