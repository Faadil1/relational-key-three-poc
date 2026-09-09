# Collectible Batch 005

Status: implementation candidate, final pre-Vercel lot.

Scope: four remaining interactive families converted into real-card relational pairs before a possible complete Vercel preview build.

## Families

| Family | Pair | Relation | Response | Boundary |
| --- | --- | --- | --- | --- |
| `service-benin` | Card/contact -> reader/window | Registered contact | Service window opens only when contact is registered | No historical operating procedure or archive raster reproduction. |
| `food-toyama` | Package constraint -> leaf/reveal | Ordered release | Receiving member opens only when release is complete | No recipe, food-safety or commercial packaging claim. |
| `kento-japan` | Woodblock/kento -> receiving sheet | Registration + press | Transfer proves whether the pair aligned | No historical print reproduction or complete workshop instruction. |
| `stereoscopy-uk` | Left view -> right view | Controlled disparity | Depth reading exists between the two flat views | No archive raster reproduction and no requirement that every viewer perceive stereopsis. |

## Verification

Required:

- `npm test`
- `npm run check`
- GitHub Actions collectible browser QA.
- Exact browser runtime compare before Vercel promotion.

## Vercel Rule

After user review on GitHub Pages, promote with one complete Vercel build only if the full branch is green. Do not spend Vercel quota on intermediate fixes.
