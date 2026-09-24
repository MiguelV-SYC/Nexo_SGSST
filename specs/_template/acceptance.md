# Criterios de aceptación: <nombre-del-módulo>

> Cada bloque Given/When/Then de aquí se convierte en un `it(...)` dentro de
> `backend/src/<modulo>/<modulo>.service.spec.ts`. CLAUDE.md §3 exige, como mínimo,
> un caso exitoso, un caso de error esperado y un caso límite por servicio —
> por eso cada entidad de abajo debe tener al menos esas tres filas.

## <Entidad>

### Caso exitoso

```
Given <estado inicial>
When <acción>
Then <resultado esperado>
```

### Caso de error esperado

```
Given <estado inicial>
When <acción inválida>
Then <error esperado, código/mensaje>
```

### Caso límite

```
Given <estado límite — vacío, máximo, entidad no encontrada>
When <acción>
Then <resultado esperado>
```
