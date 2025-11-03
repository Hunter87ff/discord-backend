## Quick context for AI editing this repo

- Repo type: TypeScript Express backend. Entrypoint: `src/index.ts` which constructs `DiscordBackendApp` (class in `src/core/app.ts`).
- Build & run: source is compiled to `dist/`. Dev uses `npm run dev` (nodemon + `ts-node --swc -r tsconfig-paths/register`). Build uses `npm run build` (tsc) and production start uses `npm run start`.
- Path aliases: imports use `@/...` and other aliases (`@models`, `@routes`, `@utils`, `@middlewares`). During dev runtime the project relies on `tsconfig-paths/register` and `module-alias` to resolve these. See `package.json` `_moduleAliases` for compiled `dist` mappings.

## Architecture & major components

- Entry: `src/index.ts` — loads `dotenv/config`, registers `module-alias` & `tsconfig-paths`, imports `@/core/app`, and starts the app.
- App class: `src/core/app.ts` — constructs the Express application and is where global middleware & route wiring should be performed.
- Config: `src/config.ts` centralizes `appConfig` (port, jwtSecret, mongoUri, jwtExpiresIn) and `emailConfig` (SMTP creds). Prefer reading/writing env defaults here.
- Middlewares: `src/middlewares/v1/` contains middleware modules. `index.midleware.ts` currently applies `cors` and `cookie-parser` using `req.app.use(...)` (note: this registers middleware at request-time — it's a detectable pattern to be aware of).
- Utils: `src/utils/wrappers/token.ts` is the JWT wrapper. It exposes:
  - `new Token(payload).toToken()` — returns a signed token using `appConfig.jwtSecret` and `appConfig.jwtExpiresIn`.
  - `Token.fromToken(token, jwtSecret)` — verifies and returns a `Token` instance or `null`.

## Conventions and discovered patterns (do not violate)

- Environment: `dotenv/config` is used automatically in `src/index.ts`. Common env vars: `PORT`, `JWT_SECRET`, `MONGO_URI`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`, `SUPPORT_EMAIL`.
- JWT: token signing uses `appConfig.jwtSecret` from `src/config.ts`. `jwtExpiresIn` is configured in milliseconds (30 days in current config).
- Module resolution: code uses `@/...` imports. Maintain those alias paths and prefer editing `package.json` `_moduleAliases` and `tsconfig.json` if adding aliases.
- Dev run: always prefer `npm run dev` when iterating (it sets ts-node + tsconfig-paths). For one-off compiled runs use `npm run build` then `npm run start`.
- Formatting: `npm run format` (Prettier) targets `src/**/*` files.

## Examples to reference in edits

- Starting app (exact):
```ts
import 'dotenv/config';
require('module-alias/register');
import 'tsconfig-paths/register';
import DiscordBackendApp from "@/core/app";
const app = new DiscordBackendApp();
app.start();
```

- Generate token (example found in `src/core/app.ts`):
```ts
import Token from '../utils/wrappers/token';
const t = new Token({ _id: '7456', name: 'John Doe', email: 'john.doe@example.com' });
console.log(t.toToken());
```

## Things I noticed and that an AI should treat carefully

- Several files appear incomplete or are placeholders (for example `src/middlewares/v1/auth.middleware.ts` and `src/middlewares/v1/security.midleware.ts` are empty). When editing, do not assume full feature implementations exist.
- `src/middlewares/v1/index.midleware.ts` registers middleware using `req.app.use()` inside the request handler — this is unusual. If you change middleware wiring, check `src/core/app.ts` and `src/index.ts` to avoid doubling registrations.
- `package.json` dev script uses `ts-node --swc -r tsconfig-paths/register` — maintain compatibility with that runtime when adding code that relies on path aliases or SWC transforms.

## Useful quick actions for AI edits

- To add a new route: create files under `src/routes/` (or `src/controllers/` + `src/routes/`) and import them in `src/core/app.ts` (use `@/routes/...` imports). Remember to run `npm run dev` to test live.
- To add env values: update `.env` (not committed) and `src/config.ts` defaults.
- To update or add aliases: change `tsconfig.json` paths and `package.json` `_moduleAliases` to match compiled `dist` structure.

## When you are unsure

- If a file looks incomplete or a behavior is unclear (for example, how/where middlewares are meant to be registered), add a small, safe TODO comment and create a minimal unit or integration example (e.g., a simple route under `src/routes/health.ts` and wire it in `core/app.ts`) rather than performing broad refactors.

---
If you want, I can now:
- open a PR with this file added, or
- update this text after you point me to additional files or coding patterns I missed.

Please tell me if you'd like the instructions expanded (examples for routing, tests, or readme updates).
