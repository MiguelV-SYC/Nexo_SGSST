# Spec: comites

## 1. Propósito

Resuelve los numerales 1.1.6, 1.1.7 y 1.1.8 del Decreto 1072 de 2015 (conformación y
funcionamiento de COPASST y del Comité de Convivencia Laboral — COCOLA) y el numeral 5.1.2
(Brigada de emergencia). Sirve principalmente al rol **Líder SST** (crea/gestiona comités,
registra actas) y al **Líder de apoyo**/**practicante** (consulta, según permisos otorgados
en el módulo de Gestión de accesos).

Referencia visual ya aprobada: `frontend/assets/Mockup_Nexo/NexoV.5_mockup.html`,
vistas `view-comites`, `view-comites-copasst`, `view-comites-cocola`, `view-comites-brigada`.

## 2. Entidades del dominio

| Entidad              | Campo                      | Tipo                                                                                 | Origen / regla                                                                                                                      |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Comite**     | id                         | uuid                                                                                 | —                                                                                                                                  |
|                      | organizacionId             | uuid                                                                                 | FK → Organización (módulo`organizaciones`)                                                                                     |
|                      | tipo                       | enum(`COPASST`,`COCOLA`,`BRIGADA`)                                             | fijo, no editable tras creación                                                                                                    |
|                      | nombreCompleto             | string                                                                               | ej. "Comité Paritario de Seguridad y Salud en el Trabajo"                                                                          |
|                      | periodoInicio / periodoFin | date                                                                                 | período de vigencia (ej. 2025–2027)                                                                                               |
|                      | estado                     | enum(`en_proceso`,`cumple`)                                                      | derivado:`cumple` si actas al día y sin vencidas                                                                                 |
| **Integrante** | id                         | uuid                                                                                 | —                                                                                                                                  |
|                      | comiteId                   | uuid                                                                                 | FK → Comite                                                                                                                        |
|                      | trabajadorId               | uuid                                                                                 | FK → Trabajador (módulo`trabajadores`) — de aquí se heredan nombre/documento/sede                                             |
|                      | rol                        | string                                                                               | ej. "Presidente (representante empleador)", "Brigadista — primeros auxilios"                                                       |
|                      | vigente                    | boolean                                                                              | false si fue reemplazado antes de vencer el período                                                                                |
| **Actividad**  | id                         | uuid                                                                                 | —                                                                                                                                  |
|                      | comiteId                   | uuid                                                                                 | FK → Comite                                                                                                                        |
|                      | tipo                       | enum(`reunion`,`capacitacion`,`inspeccion`,`simulacro`,`seguimiento_caso`) | —                                                                                                                                  |
|                      | fecha                      | date                                                                                 | —                                                                                                                                  |
|                      | estado                     | enum(`proxima`,`vencida`,`realizada`)                                          | `vencida` = `proxima` cuya fecha ya pasó sin ejecutarse                                                                        |
| **Soporte**    | id                         | uuid                                                                                 | —                                                                                                                                  |
|                      | actividadId                | uuid                                                                                 | FK → Actividad                                                                                                                     |
|                      | tipo                       | enum(`soporte`,`reunion_vinculada`,`prueba`)                                   | corresponde a las 3 columnas del modal de trazabilidad                                                                              |
|                      | archivoUrl                 | string\| null                                                                        | null hasta que se cargue evidencia                                                                                                  |
| **Acta**       | id                         | uuid                                                                                 | —                                                                                                                                  |
|                      | comiteId                   | uuid                                                                                 | FK → Comite                                                                                                                        |
|                      | numero                     | int                                                                                  | correlativo por comité, reinicia por año                                                                                          |
|                      | contenidoHtml              | text                                                                                 | cuerpo editable tipo Word (objetivo, orden del día, desarrollo, compromisos)                                                       |
|                      | creadoPorUsuarioId         | uuid                                                                                 | FK → Usuario, quien guardó el acta                                                                                                |
|                      | creadoPorRol               | string                                                                               | rol del usuario**en el momento de crear** (se copia, no se referencia, para no perder trazabilidad si el rol cambia después) |
|                      | creadoEn                   | timestamp                                                                            | fecha + hora exactas de creación                                                                                                   |
|                      | estado                     | enum(`pendiente_firmas`,`firmada`)                                               | derivado — ver invariante de firmas                                                                                                |
| **Firma**      | id                         | uuid                                                                                 | —                                                                                                                                  |
|                      | actaId                     | uuid                                                                                 | FK → Acta                                                                                                                          |
|                      | integranteId               | uuid                                                                                 | FK → Integrante (hereda nombre/documento/cargo/sede al momento de la firma)                                                        |
|                      | firmado                    | boolean                                                                              | —                                                                                                                                  |
|                      | firmadoEn                  | timestamp\| null                                                                     | —                                                                                                                                  |

## 3. Invariantes de negocio

```
Invariante: estándares mínimos aplicables (Resolución 0312 de 2019)
Dado el total de trabajadores activos de la organización y su clase de riesgo máxima
Cuando se calcula el número de estándares mínimos exigidos al SG-SST
Entonces:
  - trabajadores > 50                         → 62 estándares (cualquier clase de riesgo)
  - trabajadores ≤ 50 y riesgo máximo IV o V   → 21 estándares
  - trabajadores entre 11 y 50, riesgo I–III   → 21 estándares
  - trabajadores ≤ 10, riesgo I–III            → 7 estándares
Nota: esta regla vive en el módulo `organizaciones`; `comites` solo la LEE
para saber si aplica exigencia de Brigada de emergencia formal (numeral 5.1.2).
```

```
Invariante: estado de un Acta
Dado un Acta con N Firmas asociadas (una por Integrante vigente al momento de crearla)
Cuando cambia el estado de cualquier Firma
Entonces Acta.estado = "firmada" si y solo si el 100% de sus Firmas tienen firmado = true;
en cualquier otro caso Acta.estado = "pendiente_firmas".
```

```
Invariante: herencia de datos del integrante en la Firma
Dado que se crea una nueva Acta para un Comite
Cuando se generan las Firmas iniciales
Entonces cada Firma copia (no referencia) nombre, documento, cargo y sede del
Integrante vigente en ese momento — si el integrante cambia de sede después,
las actas ya firmadas no deben reflejar el cambio (trazabilidad histórica).
```

```
Invariante: trazabilidad de creación de un Acta
Dado que un usuario guarda una nueva Acta
Cuando se persiste el registro
Entonces se graban de forma inmutable: creadoPorUsuarioId, creadoPorRol, creadoEn
(fecha y hora). Estos tres campos no se pueden editar después de creados,
ni siquiera por un administrador — es el requisito de auditoría del módulo.
```

```
Invariante: alerta de evento próximo
Dado el conjunto de Actividades de un Comite con estado = "proxima"
Cuando se solicita el resumen del comité (endpoint de detalle)
Entonces se devuelve la actividad con fecha más cercana a hoy como "próximo evento",
con los días restantes calculados en el servidor (no en el cliente).
```

```
Invariante: baja de un integrante con firma pendiente
[Decisión de negocio confirmada 2026-09-23]

Dado un Acta en estado "pendiente_firmas" y una Firma sin firmar asociada
      a un Integrante
Cuando ese Integrante deja de ser vigente (vigente = false)
Entonces:
  - su Firma se elimina por completo, tanto del documento (ya no aparece en
    el listado de firmantes del Acta) como del registro en base de datos —
    no se marca como "anulada", se borra.
  - el Acta.estado se recalcula sobre las Firmas restantes (puede pasar a
    "firmada" si las que quedan ya estaban todas en true).

Excepción: esta regla NO aplica a Actas ya en estado "firmada". Un Acta
cerrada es un documento legal inmutable — conserva todas sus Firmas
históricas aunque el integrante deje de ser vigente después. La invariante
de "herencia de datos del integrante en la Firma" (más arriba) sigue rigiendo
para esos casos: los datos quedan copiados tal como estaban al firmar.
```

## 4. Relaciones con otros módulos

- `organizaciones` — todo Comite pertenece a una Organización; la clase de riesgo y el
  número de trabajadores (para la Brigada, numeral 5.1.2) se leen de ahí.
- `trabajadores` — todo Integrante referencia un Trabajador existente; no se duplican
  datos de identidad, se heredan por FK (salvo en Firma, ver invariante de herencia).
- `permisos` (Gestión de accesos) — el checklist Ver/Lectura/Editar sobre la vista
  `comites` ya existe en el mockup (`getNavGroups`); este módulo solo expone los
  endpoints, el filtrado de visibilidad lo aplica el módulo de permisos.

## 5. Fuera de alcance (v1)

- Firma con biometría o certificado digital de terceros (esta versión es firma
  electrónica simple, con usuario + timestamp — no reemplaza firma digital certificada).
- Generación real de PDF (en el mockup es una simulación con `alert()`; v1 de backend
  expone el HTML del acta, la generación de PDF queda para un bolt posterior).
- Recordatorios automáticos por correo/SMS de eventos próximos (solo se calcula y
  expone la alerta; el canal de notificación es otro módulo).

## 6. Preguntas abiertas

- ¿Un Integrante puede pertenecer a más de un Comite a la vez (ej. Kevin Arley en
  COPASST y COCOLA, como ya ocurre en los datos de ejemplo del mockup)? → Asumido
  **sí** para v1, sin restricción de exclusividad.
- ¿Qué pasa con las Firmas ya registradas si un Integrante deja de ser vigente antes
  de firmar un Acta en curso? → **Resuelto 2026-09-23**: se elimina la Firma pendiente,
  tanto del documento como del sistema. Ver invariante "baja de un integrante con
  firma pendiente" en §3. No hay preguntas abiertas pendientes — módulo listo para
  el bolt de construction.
