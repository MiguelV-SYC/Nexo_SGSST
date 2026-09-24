# Backlog de módulos — AI-DLC

Orden de construcción del backend real, un módulo a la vez. Un módulo entra a
`specs/<modulo>/` antes de tener una sola línea en `backend/src/<modulo>/`.

| # | Módulo | Bolt actual | Por qué en este orden |
|---|---|---|---|
| 1 | `comites` | inception (aprobado — listo para construction) | diseño completo y validado en el mockup — COPASST/COCOLA/Brigada, actas y firmas ya definidas; sin preguntas abiertas, ver `.aidlc/bolts/2026-09-23-comites-inception.md` |
| 2 | `cumplimiento-normativo` | por iniciar | reglas del Decreto 1072 ya tabuladas en `decreto_1072.xlsx`, bajo riesgo de reinterpretación |
| 3 | `matriz-peligros` | por iniciar | depende de organizaciones + sedes (ya resuelto en el wizard de registro) |
| 4 | `organizaciones` | parcial (frontend) | bloqueante de los anteriores — DIVIPOLA y CIIU ya resueltos en frontend, falta la spec del backend |
| 5 | `trabajadores` | por iniciar | referenciado por `comites.Integrante` y por `matriz-peligros` — spec debe escribirse antes de avanzar esos dos |

## Regla de entrada/salida de un módulo en este backlog

- **Entra** a "inception" cuando existe consenso de que su diseño en el mockup está
  maduro (no va a cambiar de forma en las próximas iteraciones visuales).
- **Sale** de "construction" solo cuando los 4 comandos de CLAUDE.md §4 pasan:
  `npm run lint && npm run build && npm run test && npm run test:cov`.
- Un módulo con preguntas abiertas en su `spec.md` (sección 6) no puede pasar de
  inception a construction.
