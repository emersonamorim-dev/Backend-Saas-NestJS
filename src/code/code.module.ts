import { Module } from '@nestjs/common';
import { CodesService } from './service/code.service';
import { KafkaProducerService } from './service/kafka-producer.service';
import { PrismaService } from './service/prisma.service';

@Module({
  providers: [CodesService, PrismaService, KafkaProducerService],
  exports: [PrismaService]
})
export class CodeModule {}
