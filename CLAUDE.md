# CLAUDE.md — Estándares de calidad para el proyecto Nexo

Este archivo es leído automáticamente por Claude Code al iniciar cualquier sesión en este repositorio. Las siguientes reglas son obligatorias, no sugerencias.

## 1. Antes de escribir código

- Revisa `schema.prisma` y los módulos existentes en `src/` antes de crear una entidad, servicio o componente nuevo. **Nunca dupliques lógica que ya existe en otro servicio** — si una función similar ya existe, extiéndela o reutilízala.
- Sigue estrictamente la estructura modular de NestJS: cada módulo tiene `*.module.ts`, `*.controller.ts`, `*.service.ts`, `*.dto.ts` y su carpeta `*.spec.ts` de pruebas. No mezcles responsabilidades entre capas (el controller nunca contiene lógica de negocio; eso vive en el service).

## 2. Reglas de código obligatorias

- TypeScript en modo `strict`. **Prohibido usar `any`** salvo justificación explícita comentada en el código.
- Ninguna función supera 40 líneas ni una complejidad ciclomática mayor a 10. Si una función crece más de eso, divídela.
- Cero duplicación de bloques de código mayores a 5 líneas repetidos en más de un lugar (regla equivalente a `sonarjs/no-duplicate-string` y `sonarjs/no-identical-functions`).
- Nombres de variables, funciones y clases en español o inglés de forma **consistente en todo el archivo** — no mezclar (ej. no `getTrabajador` junto a `crearEmpresa` en el mismo servicio si el resto del proyecto usa un solo idioma).
- Todo `async` debe manejar errores explícitamente (`try/catch` o filtro de excepciones de NestJS) — nunca dejar una promesa sin manejo de error.
- Prohibido dejar `console.log` de depuración en el código final. Usar el logger de NestJS (`Logger`) si se requiere trazabilidad.
- Toda variable de entorno se declara y valida en el módulo de configuración (`@nestjs/config` con esquema de validación) — nunca se lee `process.env` directamente disperso en el código.

## 3. Pruebas — obligatorias, no opcionales

- Cada servicio nuevo requiere pruebas unitarias (`*.spec.ts`) que cubran, como mínimo: el caso exitoso, un caso de error esperado, y un caso límite (ej. entidad no encontrada).
- Cobertura mínima exigida: **80% en `src/`**. Si una tarea baja la cobertura por debajo de ese umbral, la tarea no se considera terminada.
- Los endpoints críticos (autenticación, cumplimiento normativo, documentos) requieren al menos una prueba de integración con Supertest.

## 4. Verificación obligatoria ANTES de reportar cualquier tarea como completada

Claude Code debe ejecutar estos comandos, en este orden, y **solo continuar si todos pasan**. Si alguno falla, corrige el código — nunca reportes una tarea como terminada con errores pendientes, ni ignores ni comentes reglas de lint para "hacerlas pasar".

```bash
npm run lint          # ESLint + eslint-plugin-sonarjs
npm run build         # Debe compilar sin errores ni warnings de TypeScript
npm run test          # Jest — todas las pruebas deben pasar
npm run test:cov      # Verificar que la cobertura no bajó del 80%
```

Si el proyecto tiene SonarQube local corriendo (ver sección 5), ejecutar también:

```bash
sonar-scanner
```

Y revisar que no haya "Bugs", "Vulnerabilities" ni "Code Smells" de severidad Alta o Crítica en el reporte antes de continuar.

## 5. Configuración de análisis estático (setup, una sola vez)

Instalar en el proyecto:

```bash
npm install -D eslint-plugin-sonarjs
```

Agregar a `.eslintrc` (o `eslint.config.js` si usas flat config):

```json
{
  "plugins": ["sonarjs"],
  "extends": ["plugin:sonarjs/recommended"]
}
```

Para la auditoría completa (opcional pero recomendado antes de cada entrega grande), levantar SonarQube Community Edition localmente vía Podman:

```yaml
# agregar al docker-compose.yml
sonarqube:
  image: docker.io/library/sonarqube:community
  ports:
    - "9000:9000"
  environment:
    SONAR_ES_BOOTSTRAP_CHECKS_DISABLE: "true"
```

Y correr el análisis con `sonar-scanner` apuntando a `http://localhost:9000`.

## 6. Qué hacer si algo no compila o una prueba falla

- **Nunca** eliminar o comentar una prueba que falla para "que pase" — corrige la causa raíz.
- **Nunca** hacer `// eslint-disable` sin justificar en un comentario por qué esa línea específica necesita la excepción.
- Si el error persiste después de dos intentos de corrección, detente y reporta el problema explícitamente en vez de forzar una solución que rompa otra parte del código.

## 7. Antes de entregar (checklist final)

- [ ] `npm run lint` sin errores
- [ ] `npm run build` sin errores
- [ ] `npm run test` — 100% de las pruebas pasan
- [ ] Cobertura ≥ 80%
- [ ] Sin `console.log`, sin `any` sin justificar, sin código comentado "por si acaso"
- [ ] Sin bloques de código duplicados
- [ ] Todo endpoint nuevo documentado con decoradores de Swagger (`@ApiProperty`, `@ApiOperation`)
