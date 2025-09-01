export interface PaymentGateway {
  charge(amount: number, card: string): boolean;
}
