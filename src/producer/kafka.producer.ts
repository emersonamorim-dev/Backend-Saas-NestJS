import { Producer, KafkaMessage } from 'kafkajs';
import kafka from 'src/config/kafka.config';

const producer: Producer = kafka.producer();

export async function sendToKafkaTopic(topic: string, message: any): Promise<void> {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
}

export default producer;
