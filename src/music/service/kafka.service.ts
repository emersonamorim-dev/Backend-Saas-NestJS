import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Music } from '../model/music.model';

@Injectable()
export class KafkaService {
  private kafka: Kafka;
  private producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'music-app',
      brokers: ['localhost:9092'], // Substitua com a URL do seu broker Kafka
    });

    this.producer = this.kafka.producer();
    this.producer.connect();
  }

  async sendNewMusicMessage(music: Music) {
    const message = {
      key: music.id,
      value: JSON.stringify(music),
    };

    await this.producer.send({
      topic: 'new_music_topic', // Substitua pelo tópico Kafka apropriado
      messages: [message],
    });
  }
}
