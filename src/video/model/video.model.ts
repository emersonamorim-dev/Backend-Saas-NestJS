export interface Video {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  videoLink?: string; // Propriedade opcional, pode ser definida ou não
}
