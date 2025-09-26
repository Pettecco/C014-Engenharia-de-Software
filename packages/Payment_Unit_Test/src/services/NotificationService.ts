export interface NotificationService {
  sendPurchaseConfirmation(email: string, amaount: number, itemCount: number): Promise<boolean>;
  sendPaymentFailure(email: string, amaount: number, reason: string): Promise<boolean>;
}
