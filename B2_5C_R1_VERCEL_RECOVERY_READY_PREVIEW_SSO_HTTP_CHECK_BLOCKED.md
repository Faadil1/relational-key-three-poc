# RELATIONAL KEY — B2.5C-R1

Date: 2026-08-29
Gate: `B2.5 — 24-FAMILY COLLECTION REGRESSION`
Output: `VERCEL BUILD-RATE-LIMIT RECOVERY + LIVE 24-ROUTE TECHNICAL PRECHECK`

# VERDICT

# **VERCEL RECOVERY PASS / EXACT 24-FAMILY BUILD READY / HTTP ROUTE CHECK BLOCKED BY PREVIEW SSO**

B2.5C is not yet closed. The former Vercel build-rate-limit blocker is resolved, but the connector cannot complete authenticated HTTP route-by-route requests against the protected preview.

This is an access-boundary issue, not a build, source, route-source, family, or relational failure.

# CANONICAL INVARIANT

**THE RELATIONAL PAIR REMAINS THE PRODUCT.**

`PAIR MEMBER → RELATION → OTHER MEMBER RESPONSE`

No family-native runtime files were modified in this recovery step.

# SOURCE STATE — PRESERVED

B2.5C source integration remains PASS.

Runtime integration commit:
`a073af05cb16c3934e06ce353a2e0017690b611d`

Checkpoint before recovery:
`7610876affa27b3f1381b10e00caa9a4e37459f0`

Registry remains:
- schema `1.3`;
- `validated_count = 24`;
- `candidate_count = 0`;
- Africa 4;
- Asia 4;
- North America 4;
- South America 4;
- Oceania 4;
- Europe 4.

Candidate immutability remains PASS 9/9.

# RATE-LIMIT RECOVERY — PASS

A source-neutral retrigger commit was created with the exact same Git tree as the B2.5C checkpoint:

`5d3ed9de5fbbf0427f1ad0eac5b6910b4a220f5a`

Commit message:
`chore: retrigger canonical 24-family Vercel preview`

No files changed in this commit.

GitHub/Vercel combined status:
`Vercel = success`

# READY DEPLOYMENT — PASS

Deployment:
`dpl_ERZaEXq8vs4knBEsgdUTNshmoCaB`

Preview hostname:
`relational-key-collectionrelational-key-collection-3w617k1qt.vercel.app`

Project:
`prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`

Team:
`team_twDc66jGM0sPvNM4I5Huc0x7`

State:
`READY`

Deployment metadata proves:
- repository `Faadil1/relational-key-three-poc`;
- branch `collection/global-refinement-1`;
- exact commit `5d3ed9de5fbbf0427f1ad0eac5b6910b4a220f5a`;
- Git source deployment;
- no alias error.

Build log proves:
- Vercel cloned branch `collection/global-refinement-1` at commit `5d3ed9d`;
- `vercel build` completed;
- deployment outputs completed successfully;
- no build error was emitted.

Therefore the prior `build-rate-limit` blocker is CLOSED.

# PREVIEW AUTH BOUNDARY

Direct HTTP checks from the available Vercel fetch connector return `302` to Vercel SSO before application content is exposed.

A temporary Vercel share link was generated, but connector fetch still entered the SSO redirect loop instead of retaining the browser authentication cookie.

The branch alias is protected by the same Preview SSO layer.

A generic web fetch cannot access the protected deployment either.

Therefore automated HTTP checks from this execution environment cannot truthfully prove:
- root response body;
- registry response body;
- 24 route response statuses;
- wrapper-to-candidate loading;
- Back-to-Atlas HTTP/navigation behavior.

Do not mark these as PASS by inference.

# WHAT IS PROVEN NOW

- SOURCE 24-family integration: PASS
- SOURCE route inventory: PASS
- 24 explicit Atlas signatures: PASS
- candidate immutability: PASS 9/9
- Vercel rate-limit recovery: PASS
- exact Git commit deployed: PASS
- Vercel build: PASS
- deployment state READY: PASS
- HTTP 24-route execution: NOT YET PROVEN
- USER Atlas visual/navigation: NOT RUN
- USER causal batches A–D: NOT RUN
- VALIDATED families: 24 unchanged

# NEXT EXACT OUTPUT

# **B2.5C-R1A — AUTHENTICATED IN-BROWSER 24-ROUTE SMOKE CHECK**

Run the smoke check from a browser session that can open the protected READY preview. The check must:

1. verify root contains `24 PAIR-NATIVE FAMILIES` and `The pair is the product.`;
2. fetch `/collection/families.json` and prove schema `1.3`, 24 families, 0 candidates and six continents × 4;
3. fetch all 24 canonical `route` values and record HTTP status;
4. require all 24 canonical routes to return OK;
5. require all 24 wrapper responses to expose `BACK TO ATLAS`;
6. for the nine Balance-Gate families, fetch `<route>candidate.html` and require OK;
7. produce a visible PASS/FAIL summary plus copyable JSON evidence.

If R1A PASS:
- close B2.5C as TECHNICAL PASS;
- freeze dedicated PASS register;
- update CURRENT_STATE / HANDOVER / PR #21;
- open exactly one next gate:

# **B2.5D — 24-FAMILY ATLAS USER VISUAL + NAVIGATION GATE**

B2.5D will then cover desktop visual coherence and true ~390 px visual/navigation proof before causal USER batches A–D.

PR #21 remains `DRAFT / DO NOT MERGE`.
G4 remains PARKED until B2.5 closes.
