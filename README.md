# a11y-baseline

A reverse-engineering exercise: audit the **Government of Tamil Nadu portal (tn.gov.in)** for accessibility and architecture issues, then build a small full-stack foundation that avoids those problems by design.

## Repository tree
```
a11y-baseline/
├── client/            # Vite + vanilla JS front end (no framework lock-in)
│   ├── index.html     # semantic landmarks, skip link, language nav
│   └── src/           # main.js (form behaviour), styles.css (focus, contrast tokens)
├── server/            # Express API
│   └── src/           # app.js (routes), validate.js (rules), index.js (entry)
├── docs/              # audit report, audit worksheet CSV, screenshots/
├── tests/             # server/ unit tests, keyboard/ manual checklist
├── .github/workflows/ # CI runs the test suite
└── package.json       # npm workspaces root
```

## Boundaries
| Layer | Owns | Must not |
|---|---|---|
| **client** | Markup, focus management, rendering messages | Decide what is valid; hold business rules |
| **server** | Validation rules, error message wording, reference numbers | Render HTML or know about layout |
| **docs** | Audit evidence and decisions | Contain runnable code |
| **tests** | Automated server tests and manual keyboard checks | Depend on client styling |

The API contract is the only coupling: `POST /api/requests` returns `201 {reference}` or `400 {errors: {field: message}}`. Error messages are written server-side to say what is wrong and how to fix it, so every future client gets accessible wording for free.

## Local setup
Requires Node 20+.
```bash
npm install
npm run dev:server   # http://localhost:3001  (GET /api/health)
npm run dev:client   # http://localhost:5173  (proxies /api to the server)
npm test             # runs server unit tests
```

## First vertical feature slice: accessible service request
One thin path through every layer: **form (client) -> POST /api/requests -> validation (server) -> accessible error summary (client)**.

It addresses the audit directly:
- **WEB-001/002/005**: the client has no unlabelled images or links; the language switch is real text with `lang="ta"`, and every control has an accessible name
- **WEB-003/004**: no images in the slice; decorative graphics would use CSS
- Extra hardening beyond the audit: skip link, global `:focus-visible` outline, `<label>` on every input, hints via `aria-describedby`, and a focused error summary linking to each field

## Next slices
Tamil/English content switching, document upload with text alternatives, automated axe checks in CI.
