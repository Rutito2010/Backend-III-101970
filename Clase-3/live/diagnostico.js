import { checkout } from './checkout.js';

const order = {
  customer: 'user-ana',
  total: 3000
};

// “API real”: lenta y a veces falla
const realPaymentGateway = {
  async charge(amount) {
    await new Promise((r) => setTimeout(r, 600));
    if (Math.random() < 0.45) {
      throw new Error('StripeTimeout: connection reset');
    }
    return { ok: true, amount };
  }
};

const realNotifier = {
  async push(customerId, message) {
    await new Promise((r) => setTimeout(r, 200));
    console.log(`[push real → ${customerId}] ${message}`);
  }
};

try {
  const result = await checkout(order, realPaymentGateway, realNotifier);
  console.log('Esta vez anduvo:', result);
} catch (err) {
  console.log('Falló (puede pasar otra vez):', err.message);
}
