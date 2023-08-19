import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { PayService } from '../service/pay.service';
import { KafkaService } from '../service/kafka.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../model/payment.model';

@Controller('pay')
export class PayController {
  constructor(
    private readonly payService: PayService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Post()
  async createPayment(@Body() paymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.payService.createPayment(paymentDto);
    await this.kafkaService.sendKafkaMessage('payment-created', payment);
    return payment;
  }

  @Get(':id')
  async getPayment(@Param('id') id: string): Promise<Payment> {
    const payment = await this.payService.getPaymentById(id);
    if (!payment) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }
    return payment;
  }

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return this.payService.getAllPayments();
  }

  @Put(':id')
  async updatePayment(@Param('id') id: string, @Body() paymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.payService.updatePayment(id, paymentDto);
    if (!payment) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }
    await this.kafkaService.sendKafkaMessage('payment-updated', payment);
    return payment;
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string): Promise<void> {
    const result = await this.payService.deletePayment(id);
    if (!result) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }
    await this.kafkaService.sendKafkaMessage('payment-deleted', { id });
  }
}


