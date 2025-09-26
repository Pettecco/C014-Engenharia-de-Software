import { PaymentGatewayService } from './services/PaymentGatewayService';
import { NotificationService } from './services/NotificationService';
import { CardSchema } from './utils/ValidateCard';

export class OnlineStore {
  private cart: number[] = [];
  private gateway: PaymentGatewayService;
  private notificationService?: NotificationService;

  constructor(gateway: PaymentGatewayService, notificationService?: NotificationService) {
    this.gateway = gateway;
    this.notificationService = notificationService;
  }

  addProduct(price: number): void {
    if (price <= 0) throw new Error('Invalid price');
    this.cart.push(price);
  }

  calculateTotal(): number {
    return this.cart.reduce((acc, price) => acc + price, 0);
  }

  clearCart(): void {
    this.cart = [];
  }

  /*
    Desconto de 5% para compras entre 100 e 200 reais
    Desconto de 10% para compras até 300 reais
    Desconto de 15% para compras maiores que 300 reais
  */
  calculateDiscount(): number {
    const total = this.calculateTotal();

    if (total < 100) return total;

    if (total >= 100 && total <= 200) {
      return total - total * 0.05;
    }

    if (total <= 300) {
      return total - total * 0.1;
    }

    return total - total * 0.15;
  }

  async completePurchase(card: string, customerEmail: string): Promise<string> {
    const cardValidation = CardSchema.safeParse(card);

    if (!cardValidation.success) {
      throw new Error('Invalid card');
    }

    const total = this.calculateTotal();
    const success = this.gateway.charge(total, card);

    if (success) {
      this.clearCart();
      if (this.notificationService) {
        await this.notificationService.sendPurchaseConfirmation(
          customerEmail,
          total,
          this.cart.length,
        );
      }
      return 'Purchase approved';
    } else {
      if (this.notificationService) {
        await this.notificationService.sendPaymentFailure(customerEmail, total, 'Payment declined');
      }
    }
    return 'Payment failed';
  }
}
