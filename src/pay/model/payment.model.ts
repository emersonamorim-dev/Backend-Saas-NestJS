export interface Payment {
  id: string;
  amount: number;
  method: 'pix' | 'credit-card';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

  