import { Module } from '@nestjs/common';
import { KafkaProducerService } from './service/kafka-producer.service';


@Module({
  providers: [KafkaProducerService], 
  exports: [KafkaProducerService], 
})
export class KafkaProducerModule {}

