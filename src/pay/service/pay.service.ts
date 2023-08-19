import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { Payment } from '../model/payment.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PayService {
  private payments: Payment[] = [];

  createPayment(paymentDto: CreatePaymentDto): Payment {
    const payment: Payment = {
      id: uuidv4(),
      amount: paymentDto.amount,
      method: paymentDto.method,
      status: 'pending',
      createdAt: new Date(),
    };
    this.payments.push(payment);
    return payment;
  }

  getPaymentById(id: string): Payment | null {
    const payment = this.payments.find(p => p.id === id);
    if (!payment) {
      return null;
    }
    return payment;
  }

  getAllPayments(): Payment[] {
    return this.payments;
  }

  updatePayment(id: string, paymentDto: CreatePaymentDto): Payment | null {
    const paymentIndex = this.payments.findIndex(p => p.id === id);
    if (paymentIndex === -1) {
      return null;
    }
    const updatedPayment = {
      ...this.payments[paymentIndex],
      ...paymentDto,
      id: this.payments[paymentIndex].id, 
      createdAt: this.payments[paymentIndex].createdAt, 
    };
    this.payments[paymentIndex] = updatedPayment;
    return updatedPayment;
  }

  deletePayment(id: string): boolean {
    const paymentIndex = this.payments.findIndex(p => p.id === id);
    if (paymentIndex === -1) {
      return false;
    }
    this.payments.splice(paymentIndex, 1);
    return true;
  }
}
