import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'your-app-id',
  brokers: ['kafka-server:9092'], // Insira seus brokers do Kafka aqui
});

export default kafka;
