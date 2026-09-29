import { checkout } from './checkout.js';

// Stub: imita la pasarela con resultado fijo (determinista, sin red)

const order = {
  customer: 'user-ana',
  total: 3000
};

const notifierQuiet = {
  async push() {}
};

const paymentOk = {
  async charge(amount) {
    return { ok: true, amount };
  }
};

const paymentReject = {
  async charge() {
    return { ok: false, reason: 'fondos_insuficientes' };
  }
};

const paid = await checkout(order, paymentOk, notifierQuiet);
console.log('stub OK →', paid);

try {
  await checkout(order, paymentReject, notifierQuiet);
} catch (err) {
  console.log('stub rechazado →', err.message);
}
