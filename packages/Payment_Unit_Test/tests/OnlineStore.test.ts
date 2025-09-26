import { OnlineStore } from '../src/OnlineStore';
import { PaymentGatewayService } from '../src/services/PaymentGatewayService';
import { NotificationService } from '../src/services/NotificationService';

describe('OnlineStore - Testing methods', () => {
  let mockGateway: jest.Mocked<PaymentGatewayService>;
  let mockNotification: jest.Mocked<NotificationService>;
  let store: OnlineStore;

  // Fixture
  beforeEach(() => {
    mockGateway = { charge: jest.fn() };
    mockNotification = {
      sendPaymentFailure: jest.fn(),
      sendPurchaseConfirmation: jest.fn(),
    };
    store = new OnlineStore(mockGateway);
  });

  test('addProducts add items to the cart', () => {
    store.addProduct(40);
    store.addProduct(20);
    expect(store.calculateTotal()).toBe(60);
  });

  test('addProduct throws error for negative prices', () => {
    expect(() => store.addProduct(-10)).toThrow('Invalid price');
  });

  test('addProduct throws error for zero prices', () => {
    expect(() => store.addProduct(0)).toThrow('Invalid price');
  });

  test('calculateTotal returns correct sum', () => {
    store.addProduct(30);
    store.addProduct(20);
    expect(store.calculateTotal()).toBe(50);
  });

  test('clearCart empties the cart', () => {
    store.addProduct(10);
    store.addProduct(20);
    store.clearCart();
    expect(store.calculateTotal()).toBe(0);
  });

  test('calculate no discount when cart is empty', () => {
    store.clearCart();
    expect(store.calculateDiscount()).toBe(0);
  });

  test('calculate no discount when items does not sum at least 100$', () => {
    const totalProduct = 50;
    store.addProduct(totalProduct);
    expect(store.calculateDiscount()).toBe(totalProduct);
  });

  test('calculate 5% discount', () => {
    store.addProduct(100);
    expect(store.calculateDiscount()).toBe(95);
  });

  test('calculate 10% discount', () => {
    store.addProduct(220);
    expect(store.calculateDiscount()).toBe(198);
  });

  test('calculate 15% discount', () => {
    store.addProduct(350);
    expect(store.calculateDiscount()).toBe(297.5);
  });

  test('invalid card when trying to purchase with a invalid card', async () => {
    await expect(store.completePurchase('123abc', 'test@example.com')).rejects.toThrow(
      'Invalid card',
    );
  });

  test('completePurchase approves purchase when mock returns true', async () => {
    store.addProduct(200);
    mockGateway.charge.mockReturnValue(true);

    const result = await store.completePurchase('1111111111111111', 'test@example.com');

    expect(result).toBe('Purchase approved');
    expect(mockGateway.charge).toHaveBeenCalledWith(200, '1111111111111111');
  });

  test('completePurchase fails purchase when mock returns false', async () => {
    store.addProduct(200);
    mockGateway.charge.mockReturnValue(false);

    const result = await store.completePurchase('2222222222222222', 'test@example.com');

    expect(result).toBe('Payment failed');
    expect(mockGateway.charge).toHaveBeenCalledTimes(1);
  });

  test('Clean cart after sucessfull payment', async () => {
    store.addProduct(100);
    mockGateway.charge.mockReturnValue(true);
    await store.completePurchase('4444444444444444', 'test@example.com');

    expect(store.calculateTotal()).toBe(0);
  });

  test('sends purchase confirmation when payment succeeds with notification service', async () => {
    store = new OnlineStore(mockGateway, mockNotification);
    store.addProduct(150);
    mockGateway.charge.mockReturnValue(true);
    mockNotification.sendPurchaseConfirmation.mockResolvedValue(true);

    const result = await store.completePurchase('1111111111111111', 'customer@example.com');

    expect(result).toBe('Purchase approved');
    expect(mockNotification.sendPurchaseConfirmation).toHaveBeenCalledWith(
      'customer@example.com',
      150,
      expect.any(Number),
    );
  });

  test('sends payment failure notification when payment fails with notification service', async () => {
    store = new OnlineStore(mockGateway, mockNotification);
    store.addProduct(200);
    mockGateway.charge.mockReturnValue(false);
    mockNotification.sendPaymentFailure.mockResolvedValue(true);

    const result = await store.completePurchase('2222222222222222', 'customer@example.com');

    expect(result).toBe('Payment failed');
    expect(mockNotification.sendPaymentFailure).toHaveBeenCalledWith(
      'customer@example.com',
      200,
      'Payment declined',
    );
  });

  test('works without notification service', async () => {
    store.addProduct(100);
    mockGateway.charge.mockReturnValue(true);

    const result = await store.completePurchase('3333333333333333', 'test@example.com');

    expect(result).toBe('Purchase approved');
    expect(store.calculateTotal()).toBe(0);
  });

  test('notification failure does not break successful purchase', async () => {
    store = new OnlineStore(mockGateway, mockNotification);
    store.addProduct(100);
    mockGateway.charge.mockReturnValue(true);
    mockNotification.sendPurchaseConfirmation.mockResolvedValue(false);

    const result = await store.completePurchase('4444444444444444', 'customer@example.com');

    expect(result).toBe('Purchase approved');
    expect(store.calculateTotal()).toBe(0);
  });

  test('multiple products calculate correct total for notification', async () => {
    store = new OnlineStore(mockGateway, mockNotification);
    store.addProduct(50);
    store.addProduct(75);
    store.addProduct(25);
    mockGateway.charge.mockReturnValue(true);
    mockNotification.sendPurchaseConfirmation.mockResolvedValue(true);

    await store.completePurchase('5555555555555555', 'multi@example.com');

    expect(mockNotification.sendPurchaseConfirmation).toHaveBeenCalledWith(
      'multi@example.com',
      150,
      expect.any(Number),
    );
  });

  test('notification service not called when payment gateway fails', async () => {
    store = new OnlineStore(mockGateway, mockNotification);
    store.addProduct(100);
    mockGateway.charge.mockReturnValue(false);

    await store.completePurchase('6666666666666666', 'customer@example.com');

    expect(mockNotification.sendPurchaseConfirmation).not.toHaveBeenCalled();
    expect(mockNotification.sendPaymentFailure).toHaveBeenCalledTimes(1);
  });
});
