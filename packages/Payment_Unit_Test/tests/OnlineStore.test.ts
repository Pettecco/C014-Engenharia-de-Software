import { OnlineStore } from '../src/OnlineStore';
import { PaymentGateway } from '../src/PaymentGateway';

describe('OnlineStore - Testing methods', () => {
  let mockGateway: jest.Mocked<PaymentGateway>;
  let store: OnlineStore;

  // Fixture
  beforeEach(() => {
    mockGateway = { charge: jest.fn() };
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

  test('invalid card when trying to purchase with a invalid card', () => {
    expect(() => store.completePurchase('123abc')).toThrow('Invalid card');
  });

  test('completePurchase approves purchase when mock returns true', () => {
    store.addProduct(200);
    mockGateway.charge.mockReturnValue(true);

    const result = store.completePurchase('1111111111111111');

    expect(result).toBe('Purchase approved');
    expect(mockGateway.charge).toHaveBeenCalledWith(200, '1111111111111111');
  });

  test('completePurchase fails purchase when mock returns false', () => {
    store.addProduct(200);
    mockGateway.charge.mockReturnValue(false);

    const result = store.completePurchase('2222222222222222');

    expect(result).toBe('Payment failed');
    expect(mockGateway.charge).toHaveBeenCalledTimes(1);
  });

  test('Clean cart after sucessfull payment', () => {
    store.addProduct(100);
    mockGateway.charge.mockReturnValue(true);
    store.completePurchase('4444444444444444');

    expect(store.calculateTotal()).toBe(0);
  });
});
