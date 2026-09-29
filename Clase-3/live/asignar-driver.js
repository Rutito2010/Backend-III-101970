import assert from 'node:assert/strict';
import { canAssignDelivery } from './checkout.js';

function createFakeDriversRepo(seed = []) {
  const store = [...seed];
  return {
    async findById(id) {
      return store.find((d) => d.id === id) || null;
    },
    async listAvailable() {
      return store.filter((d) => d.isAvailable);
    }
  };
}

// fixtures
const drivers = [
  { id: 1, role: 'driver', isAvailable: true, email: 'diego@test.com' },
  { id: 2, role: 'store', isAvailable: false, email: 'tienda@test.com' },
  { id: 3, role: 'driver', isAvailable: false, email: 'ana@test.com' }
];

// stubs de clima
const weatherClear = { severity: 'clear' };
const weatherStorm = { severity: 'storm' };

const repo = createFakeDriversRepo(drivers);
const diego = await repo.findById(1);
const tienda = await repo.findById(2);
const ana = await repo.findById(3);

// aserciones
assert.equal(canAssignDelivery(diego, weatherClear), true); // libre + clima ok
assert.equal(canAssignDelivery(tienda, weatherClear), false); // no es driver
assert.equal(canAssignDelivery(ana, weatherClear), false); // ocupada
assert.equal(canAssignDelivery(diego, weatherStorm), false); // tormenta
assert.equal(canAssignDelivery(ana, weatherStorm), false); // peor caso

const disponibles = await repo.listAvailable();
assert.deepEqual(
  disponibles.map((d) => d.email),
  ['diego@test.com']
);

console.log('asignar-driver: aserciones OK');
