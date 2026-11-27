# Matriz manual ↔ automatizado

Correspondencia 1:1 de los 21 casos funcionales (10 WEB + 11 API). CARGA y SEGURIDAD se documentan en el plan manual y en `docs/MATRIZ_TRAZABILIDAD.md`.

| ID | Caso manual | Test automatizado | Estado manual | Estado auto | Última ejecución |
|---|---|---|---|---|---|
| WEB-01 | `CASOS/WEB/WEB-01_login_correcto.md` | `e2e/tests/login.spec.ts::WEB-01` | ✅ | ✅ | 2026-11-27 |
| WEB-02 | `CASOS/WEB/WEB-02_login_bloqueado.md` | `e2e/tests/login.spec.ts::WEB-02` | ✅ | ✅ | 2026-11-27 |
| WEB-03 | `CASOS/WEB/WEB-03_credenciales_invalidas.md` | `e2e/tests/login.spec.ts::WEB-03` | ✅ | ✅ | 2026-11-27 |
| WEB-04 | `CASOS/WEB/WEB-04_campos_vacios.md` | `e2e/tests/login.spec.ts::WEB-04` | ✅ | ✅ | 2026-11-27 |
| WEB-05 | `CASOS/WEB/WEB-05_anadir_1_producto.md` | `e2e/tests/cart.spec.ts::WEB-05` | ✅ | ✅ | 2026-11-27 |
| WEB-06 | `CASOS/WEB/WEB-06_anadir_3_productos.md` | `e2e/tests/cart.spec.ts::WEB-06` | ✅ | ✅ | 2026-11-27 |
| WEB-07 | `CASOS/WEB/WEB-07_eliminar_producto.md` | `e2e/tests/cart.spec.ts::WEB-07` | ✅ | ✅ | 2026-11-27 |
| WEB-08 | `CASOS/WEB/WEB-08_checkout_happy.md` | `e2e/tests/checkout.spec.ts::WEB-08` | ✅ | ✅ | 2026-11-27 |
| WEB-09 | `CASOS/WEB/WEB-09_checkout_sin_datos.md` | `e2e/tests/checkout.spec.ts::WEB-09` | ✅ | ✅ | 2026-11-27 |
| WEB-10 | `CASOS/WEB/WEB-10_orden_precio.md` | `e2e/tests/cart.spec.ts::WEB-10` | ✅ | ✅ | 2026-11-27 |
| API-01 | `CASOS/API/API-01_auth_valido.md` | `api/tests/auth.spec.ts::API-01` | ✅ | ✅ | 2026-11-27 |
| API-02 | `CASOS/API/API-02_auth_invalido.md` | `api/tests/auth.spec.ts::API-02` | ✅ | ✅ | 2026-11-27 |
| API-03 | `CASOS/API/API-03_listar_reservas.md` | `api/tests/booking-crud.spec.ts::API-03` | ✅ | ✅ | 2026-11-27 |
| API-04 | `CASOS/API/API-04_get_reserva.md` | `api/tests/booking-crud.spec.ts::API-04` | ✅ | ✅ | 2026-11-27 |
| API-05 | `CASOS/API/API-05_crear_reserva.md` | `api/tests/booking-crud.spec.ts::API-05` | ✅ | ✅ | 2026-11-27 |
| API-06 | `CASOS/API/API-06_put_reserva.md` | `api/tests/booking-crud.spec.ts::API-06` | ✅ | ✅ | 2026-11-27 |
| API-07 | `CASOS/API/API-07_patch_reserva.md` | `api/tests/booking-crud.spec.ts::API-07` | ✅ | ✅ | 2026-11-27 |
| API-08 | `CASOS/API/API-08_delete_reserva.md` | `api/tests/booking-crud.spec.ts::API-08` | ✅ | ✅ | 2026-11-27 |
| API-09 | `CASOS/API/API-09_put_sin_token.md` | `api/tests/negative.spec.ts::API-09` | ✅ | ✅ | 2026-11-27 |
| API-10 | `CASOS/API/API-10_get_inexistente.md` | `api/tests/negative.spec.ts::API-10` | ✅ | ✅ | 2026-11-27 |
| API-11 | `CASOS/API/API-11_post_invalido.md` | `api/tests/negative.spec.ts::API-11` | ✅ | ✅ | 2026-11-27 |

Reg-01 (`e2e/tests/regression.spec.ts`) reutiliza el caso manual WEB-08 como recorrido completo login→carrito→checkout.
