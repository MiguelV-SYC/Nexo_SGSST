Módulo: comites
Bolt: inception
Fecha: 2026-09-23

Entra:
  - specs/comites/spec.md
  - specs/comites/api.yaml
  - specs/comites/acceptance.md

Fuente del diseño:
  - frontend/assets/Mockup_Nexo/NexoV.5_mockup.html
    (view-comites, view-comites-copasst, view-comites-cocola, view-comites-brigada)

Revisor: Kevin Arley (Líder SST / owner del módulo)

Puntos verificados en esta revisión:
  - Tabla de estándares mínimos (7/21/62) corresponde a Resolución 0312 de 2019,
    ya corregida en el wizard de organizaciones (ver spec.md §3).
  - Regla de firmas: Acta.estado = "firmada" solo con el 100% de Firmas en true —
    coincide con el comportamiento ya implementado en el mockup (guardarActa()).
  - Herencia de datos del integrante en cada Firma (nombre/documento/cargo/sede)
    confirmada como copia, no referencia — necesario para trazabilidad histórica.

Preguntas abiertas dejadas pendientes (ver spec.md §6):
  - Integrante en más de un comité a la vez → resuelto para v1 (sí, sin restricción).
  - Integrante que deja de ser vigente con una firma en curso → resuelto
    2026-09-23 (ver actualización abajo).

---

Actualización: 2026-09-23, mismo día

Decisión de negocio recibida: la Firma pendiente de un integrante no vigente
se elimina tanto del documento como del sistema. No aplica a Actas ya
"firmada" (documento legal inmutable).

Cambios aplicados en esta misma revisión:
  - specs/comites/spec.md §3 → nueva invariante "baja de un integrante con
    firma pendiente", con su excepción explícita para actas ya firmadas.
  - specs/comites/spec.md §6 → pregunta cerrada, sin preguntas abiertas.
  - specs/comites/api.yaml → nuevo endpoint
    PATCH /comites/{comiteId}/integrantes/{integranteId}/baja
    + schema BajaIntegranteResultado.
  - specs/comites/acceptance.md → 4 casos nuevos (exitoso, error 404,
    caso límite de acta ya firmada, caso límite de última firma pendiente).

Decisión: APROBADO. Sin preguntas abiertas en spec.md §6.

Siguiente acción: abrir 2026-09-XX-comites-construction.md y generar
backend/src/comites/{comites.module.ts, comites.controller.ts,
comites.service.ts, comites.service.spec.ts, dto/} a partir de esta spec,
cerrando con el checklist de CLAUDE.md §4.
