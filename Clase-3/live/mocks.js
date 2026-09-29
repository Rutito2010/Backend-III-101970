import assert from 'node:assert/strict';
import { mock, test } from 'node:test';
import { checkout } from './checkout.js';

test('notifica al customer después de un pago OK', async () => {
  // Arrange
  const order = { customer: 'user-ana', total: 3000 };
  const paymentOk = {
    async charge(amount) {
      return { ok: true, amount };
    }
  };
  const push = mock.fn(async () => {});

  // Act
  const result = await checkout(order, paymentOk, { push });

  // Assert
  assert.equal(result.status, 'paid');
  assert.equal(push.mock.callCount(), 1);
  assert.deepEqual(push.mock.calls[0].arguments, [
    'user-ana',
    'Tu pedido está pago'
  ]);
});
