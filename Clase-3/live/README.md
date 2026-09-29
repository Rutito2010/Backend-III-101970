# Live — mitad B (directo)

| Archivo | Concepto |
| --- | --- |
| `checkout.js` | Lógica propia |
| `diagnostico.js` | API flaky (caso base) |
| `stub.js` | Stub de pasarela |
| `mocks.js` | Mock del notifier (`mock.fn`) |
| `asignar-driver.js` | Fake + fixtures + stub clima |

```bash
cd Clase-2
node live/diagnostico.js
node live/stub.js
node --test live/mocks.js
node live/asignar-driver.js
```

Clave instructor: `docs-clase/demo/solucion/live/`.
