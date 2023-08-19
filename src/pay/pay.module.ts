import { Module } from '@nestjs/common';
import { PayService } from './service/pay.service';
import { KafkaService } from './service/kafka.service';
import { PayController } from './controller/pay.controller';

@Module({
  providers: [PayService, KafkaService],
  controllers: [PayController],
})
export class PayModule {}
