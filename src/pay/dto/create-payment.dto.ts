export class CreatePaymentDto {
    amount: number;
    method: 'pix' | 'credit-card';
    pixKey?: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCVV?: string;
  }
  