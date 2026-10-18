# Accessibility Baseline Audit: Government of Tamil Nadu portal (tn.gov.in)

**Site audited:** https://tn.gov.in  
**Date:** 18 Oct 2026  **Auditor:** <your name>  
**Method:** Lighthouse (Chrome DevTools, Accessibility category, mobile + desktop) and a keyboard-only pass (see `tests/keyboard/keyboard-checklist.md`).

> **Scope note:** Lighthouse findings are confirmed with screenshots. The keyboard-only pass was **not performed**, so no keyboard findings (skip link, focus visibility) are claimed. Recommended as follow-up.

## 1. Lighthouse results
| Page | Accessibility score | Screenshot |
|---|---|---|
| Home (www.tn.gov.in, mobile) | **82** | `screenshots/lighthouse-home.png` |
| One service page | <score> | `screenshots/lighthouse-service.png` |

## 2. Keyboard-only pass
Not completed in this baseline; see `tests/keyboard/keyboard-checklist.md` for the procedure to run next.

## 3. Findings and remediation priority
| ID | Issue | WCAG | Severity | Priority |
|---|---|---|---|---|
| WEB-001 | Accessibility icon has no alt | 1.1.1 | High | P1 |
| WEB-002 | Language switch is an unlabelled image of text | 1.1.1, 1.4.5 | High | P1 |
| WEB-005 | Links without discernible names (and no shared component enforcing alt) | 2.4.4, 4.1.2 | High | P1 |
| WEB-003 | Banner image has no alt | 1.1.1 | Medium | P2 |
| WEB-004 | Decorative bullets lack alt="" | 1.1.1 | Low | P3 |

Priority logic: issues that block task completion for keyboard or screen-reader users come first.

## 4. How findings shaped the architecture
See the root `README.md`. The first vertical slice (accessible service-request form) applies the lesson of WEB-001 to 005: every control, link and field carries an accessible name.
