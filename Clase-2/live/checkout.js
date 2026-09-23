// lógica compartida del directo (mitad B)

export async function checkout(order, paymentGateway, notifier) {
  if (!order?.total || order.total <= 0) {
    throw new Error('TOTAL_INVALIDO');
  }

  const charge = await paymentGateway.charge(order.total);
  if (!charge.ok) {
    throw new Error('PAGO_RECHAZADO');
  }

  await notifier.push(order.customer, 'Tu pedido está pago');
  return { status: 'paid', amount: order.total };
}



export function canAssignDelivery(driver, weather = { severity: 'clear' }) {
  if (!driver || driver.role !== 'driver') return false;
  if (!driver.isAvailable) return false;
  if (weather.severity === 'storm') return false;
  return true;
}
