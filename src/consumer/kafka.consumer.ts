import { Consumer, EachMessagePayload } from 'kafkajs';
import kafka from 'src/config/kafka.config';

const consumer: Consumer = kafka.consumer({ groupId: 'your-group-id' });

async function consumeFromKafkaTopic(): Promise<void> {
  await consumer.connect();
  await consumer.subscribe({ topic: 'new_questions', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      const question = JSON.parse(message.value.toString());

      console.log('Received new question:');
      console.log('Topic:', topic);
      console.log('Partition:', partition);
      console.log('Message:', question);
    },
  });
}

consumeFromKafkaTopic().catch(console.error);

