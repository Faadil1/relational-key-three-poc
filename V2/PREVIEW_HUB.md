# Preview lots hub

Purpose: give one stable review surface for closed lots before production promotion.

Runtime entry points:

- `/preview-lots`
- `/?preview=lots`
- `/?preview=lots&lot=collectible-batch-001`

The hub is intentionally light. It does not mount a Three.js canvas or load family scene chunks on the lot index. Each family opens through its existing Focus URL:

`?focus=1&pilot=<family-id>`

## Current lots

1. `city-card-001`
   - Family: `city-gatineau`
   - Status: user-approved direction.

2. `collectible-batch-001`
   - Families: `metate-teotitlan`, `siku-bolivia`, `textile-bonwire`, `boulle-france`
   - Status: implemented candidate, human hold pending.

3. `collectible-batch-002`
   - Families: `frida-coyoacan`, `zellige-fes`, `swell-marshall`, `tongiaki-tonga`
   - Status: implementation candidate, source/cultural hold pending.

## Vercel build quota rule

Current account limit: 100 builds per 24 hours.

Operating discipline:

- Use GitHub Actions artifacts and screenshots for iteration.
- Keep implementation branches as CI-only branches.
- Push to `preview/*` only when a batch is closed and green.
- Attempt one Vercel preview build per closed lot.
- If Vercel returns a rate limit, stop and wait for the reset window.
- Do not create alternate projects, teams or production aliases as quota workarounds.

This keeps the product review loop fast without treating every micro-adjustment as a deployment event.
