export interface PaymentGatewayService {
  charge(amount: number, card: string): boolean;
}
