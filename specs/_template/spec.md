# Spec: <nombre-del-módulo>

> Copia esta carpeta a `specs/<modulo>/` y completa cada sección antes de escribir cualquier archivo en `backend/src/<modulo>/`.
> Esta spec es la fuente de verdad: si el código y la spec no coinciden, gana la spec (o se actualiza la spec primero).

## 1. Propósito

Qué numeral(es) del Decreto 1072 de 2015 (u otra norma aplicable) resuelve este módulo, y a qué rol de usuario sirve.

## 2. Entidades del dominio

Para cada entidad: nombre, campos, y de dónde sale cada uno (norma, formato existente, decisión de negocio).

| Entidad | Campo | Tipo | Origen / regla |
|---|---|---|---|
| | | | |

## 3. Invariantes de negocio

Reglas que **siempre** deben cumplirse, independientemente del endpoint que las dispare. Formato Given/When/Then.

```
Dado ...
Cuando ...
Entonces ...
```

## 4. Relaciones con otros módulos

Qué entidades de otros módulos consume o de qué depende (ej. Organización, Sede, Trabajador).

## 5. Fuera de alcance

Qué queda explícitamente fuera de esta versión del módulo (evita que Construction "complete" cosas no acordadas).

## 6. Preguntas abiertas

Lo que falta decidir antes de aprobar el bolt de Inception. Un módulo con preguntas abiertas no pasa a Construction.
