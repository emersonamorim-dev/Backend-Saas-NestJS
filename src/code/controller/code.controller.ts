import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

import { CodesService } from '../service/code.service';
import { KafkaProducerService } from '../service/kafka-producer.service';
import { Code } from '../model/code.model';



@Controller('codes')
export class CodesController {
  constructor(
    private readonly codesService: CodesService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  // Create
  @Post()
  async create(@Body('question') question: string): Promise<Code> {
    const newCode = await this.codesService.create({ question });

    await this.kafkaProducerService.sendToTopic('new_questions', newCode);

    return newCode;
  }

  // Read all
  @Get()
  async findAll(): Promise<Code[]> {
    return this.codesService.findAll();
  }

  // Read one by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Code> {
    return this.codesService.findOne(+id);
  }

  // Update
  @Put(':id')
  async update(@Param('id') id: string, @Body('question') question: string): Promise<Code> {
    return this.codesService.update(+id, { question });
  }

  // Delete
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.codesService.delete(+id);
  }
}
