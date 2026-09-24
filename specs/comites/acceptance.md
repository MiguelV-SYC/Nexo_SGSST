# Criterios de aceptación: comites

> Cada bloque se convierte en un `it(...)` de `backend/src/comites/comites.service.spec.ts`
> o `backend/src/comites/actas.service.spec.ts`. CLAUDE.md §3 exige mínimo caso exitoso +
> error esperado + caso límite por servicio; aquí hay al menos esos tres por entidad.

## Comité

### Caso exitoso

```
Given una Organización existente con clase de riesgo IV y 40 trabajadores activos
When se crea un Comité de tipo COPASST para esa organización
Then el Comité se crea con estado "en_proceso" y queda asociado a la Organización
```

### Caso de error esperado

```
Given un organizacionId que no existe
When se intenta crear un Comité para ese id
Then el servicio responde 404 y no se crea ningún registro
```

### Caso límite

```
Given una Organización con exactamente 50 trabajadores y riesgo IV
When se consulta si aplica el nivel de 21 o 62 estándares (ver invariante compartida con `organizaciones`)
Then aplica 21 estándares (el límite de 50 es inclusive hacia el tramo bajo)
```

## Integrante

### Caso exitoso

```
Given un Comité COPASST y un Trabajador activo "Kevin Arley"
When se agrega a Kevin Arley como Integrante con cargo "Presidente (representante empleador)"
Then el Integrante hereda nombre, documento y sede del Trabajador, y queda vigente = true
```

### Caso de error esperado

```
Given un trabajadorId que no existe en el módulo trabajadores
When se intenta agregar como Integrante
Then el servicio responde 404 y no se crea el Integrante
```

### Caso límite

```
Given un Comité sin ningún Integrante todavía
When se consulta el detalle del comité
Then integrantes = [] (lista vacía, no error) y estado = "en_proceso"
```

## Actividad / calendario

### Caso exitoso

```
Given un Comité con una Actividad "Reunión ordinaria mensual" a 11 días de hoy
When se consulta el calendario del comité
Then proximoEvento.diasRestantes = 11 y estado = "proxima"
```

### Caso de error esperado

```
Given un comiteId que no existe
When se consulta su calendario de actividades
Then el servicio responde 404
```

### Caso límite

```
Given un Comité cuya única Actividad "proxima" tiene fecha ya pasada sin ejecutarse
When se recalcula el estado (job diario o al consultar)
Then la Actividad pasa a estado "vencida" y deja de contar como proximoEvento
```

## Acta

### Caso exitoso

```
Given un Comité COPASST con 6 Integrantes vigentes, autenticado como Kevin Arley (Líder SST)
When se guarda una nueva Acta con contenidoHtml no vacío
Then se crea el Acta con numero correlativo, estado "pendiente_firmas",
     6 Firmas (una por integrante, firmado = false), y
     creadoPorUsuarioId/creadoPorRol/creadoEn asignados por el servidor
     (nunca recibidos del cliente, aunque el request los incluya)
```

### Caso de error esperado

```
Given un Comité sin ningún Integrante vigente
When se intenta guardar una nueva Acta
Then el servicio responde 400 — un acta no puede crearse sin al menos un integrante a firmar
```

### Caso límite

```
Given un Acta con 6 Firmas, de las cuales 5 ya están firmado = true
When se registra la firma número 6 (la última pendiente)
Then Acta.estado cambia automáticamente de "pendiente_firmas" a "firmada"
     en la misma transacción que registra la Firma
```

## Firma

### Caso exitoso

```
Given una Firma pendiente para el Integrante "Harold Rein", autenticado como Harold Rein
When Harold Rein firma su propia Firma
Then firmado pasa a true y firmadoEn se registra con la hora del servidor
```

### Caso de error esperado

```
Given una Firma pendiente para el Integrante "Harold Rein"
When un usuario autenticado como "Diego Pardo" intenta firmarla
Then el servicio responde 403 — nadie firma en nombre de otro integrante
```

### Caso límite

```
Given una Firma que ya tiene firmado = true
When se intenta firmar de nuevo
Then el servicio responde 409 (conflicto) y no duplica ni sobrescribe firmadoEn
```

## Baja de integrante con firma pendiente

> Regla de negocio confirmada 2026-09-23 — ver spec.md §3.

### Caso exitoso

```
Given un Acta "pendiente_firmas" con 6 Firmas, 4 ya firmadas y 2 pendientes
      (una de ellas del Integrante "Mónica Rueda")
When "Mónica Rueda" deja de ser vigente (PATCH .../integrantes/{id}/baja)
Then su Firma pendiente se borra del Acta (documento y base de datos),
     el Acta queda con 5 Firmas totales (4 firmadas, 1 pendiente),
     y Acta.estado permanece "pendiente_firmas"
```

### Caso de error esperado

```
Given un integranteId que no pertenece al comiteId indicado en la ruta
When se solicita su baja
Then el servicio responde 404 y no se elimina ninguna Firma
```

### Caso límite

```
Given un Acta ya en estado "firmada" (documento legal cerrado), y una Firma en
      ella asociada al Integrante "Carolina Velandia"
When "Carolina Velandia" deja de ser vigente
Then su Firma en esa Acta NO se elimina — permanece intacta como registro
     histórico, y solo se actualiza Integrante.vigente = false hacia adelante
```

### Caso límite — última firma pendiente

```
Given un Acta "pendiente_firmas" con 6 Firmas, 5 ya firmadas y solo 1 pendiente
      (la del Integrante que se va a dar de baja)
When ese Integrante deja de ser vigente
Then su Firma pendiente se elimina, el Acta queda con 5 Firmas (todas firmadas),
     y Acta.estado cambia automáticamente a "firmada" en la misma operación
```
