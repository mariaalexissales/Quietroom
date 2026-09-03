# Quietroom - Threat Model and Design

## Purpose

Quietroom is designed for people who are seeking help while under coercive control or intimate partner surveillance (think victims of domestic violence). Most security models (STRIDE, PASTA, VAST) target against anonymous **external** attackers. These assumptions do not hold for the type of adversary that already has legitimate and intimate access to the victim's devices and accounts. This document defines who we are actually defending against, what we're protecting, and what's explicitly out of scope. I will be taking inspiration from the HARMS model written by researchers from the University of Cambridge. If you would like to read more about it, there is a published paper on [arXiv](https://arxiv.org/html/2502.07116v1) that details their model and the case study that exploits smart speaker controls.

## Adversary model

### Primary adversary: intimate partners with legitimate access

#### Capabilities

- Physical access to victim's devices, such as phones, laptops, tablets, or other smart devices. They also know the victim's passcodes and can unlock the device.
- Knowledge of shared account credentials. They don't need to hack anything if they already know your password.
- Co-ownership or admin rights on shared accounts. Including but not limited to joint bank accounts, streaming family plans, and even geolocation sharing apps like Life360.
- Opportunity to glance over at an open screen or check browser history/cache at a later time. This is mostly used to create leverage against the victim for trying to leave or seek advice.

#### What this model does **not** cover

- Network-level interception between the server and the internet at large. Think ISP/state-level traffic analysis TLS is our baseline defense here, and going further is a different, much larger problem we're not solving at this time.
- Legal authority to compel data from us (subpoena, law enforcement request).
- Forensic disk-recovery tools or skills to recover deleted browser data.

### Secondary adversary: opportunistic external attacker

Real domestic-violencde organizations are sometimes targeted by hostile external actors (DDoS, defacement, ideologically motivated attacks). This is a real risk, however it's a different adversary with different defenses (rate limiting, CDN, infrastructure hardening) and is **not** the focus of this project. Noted here so the omission is a decision, not an oversight. (See [Non-goals/Explicit limitations](#non-goals--explicit-limitations))

## Assets to Protect

What we're actually trying to keep out of the primary adversary's hands:

- **The fact that the site was ever visited.** Existence of the visit itself, not just its content.
- **Browser artifacts.** This includes history entries, cache, autofill data
- **Local network traces.** DNS queries or connection logs visible from a router's admin panel.
- **Uploaded content and its metadata.** photos, and any embedded EXIF/geotag data that could reveal a shelter or safe location.
- **Account/session data.** Once a user has an account, household co-members must not be able to read each other's data
- **On-screen visibility in the moment.** What's visible during a shoulder-surf

## HARMS Analysis

Mapping each in-scope concern to the HARMS framework (Harassment, Access and
infiltration, Restrictions, Manipulation and tampering, Surveillance):

| HARMS category             | Abuse scenario                                                                       | Design mitigation                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Surveillance               | Abuser recognizes the site as a hotline, on sight or via search/bookmark suggestions | Disguised landing page (weather/news cover); no identifying page title, favicon, or meta description                                                     |
| Surveillance               | Abuser checks browser history/cache after the fact and finds the visit               | Escape hatch clears relevant history state; back-button lands on the safe cover page, not the real one                                                   |
| Surveillance               | Abuser with router admin access sees DNS/connection logs revealing the domain        | Domain/branding chosen to be non-descriptive; documented as a partial mitigation — see Non-Goals                                                         |
| Surveillance               | Abuser glances at an open screen                                                     | Triple-ESC (or similar) global panic key triggers instant cover-page redirect                                                                            |
| Access and infiltration    | Abuser socially engineers or coerces a "support" contact into revealing user data    | Backend stores the minimum data needed to function; no fields exist that could answer "who visited, from where, when" even under legitimate query access |
| Manipulation and tampering | Co-owner on a shared household account edits or views another member's data          | Household-scoped RBAC (Spring Boot module) — enforced server-side, not just hidden in the UI                                                             |
| Access and infiltration    | Uploaded photo leaks a shelter's location via EXIF/GPS metadata                      | Metadata stripped server-side before storage, unconditionally, not as an opt-in setting                                                                  |

## Non-goals / Explicit Limitations

Stating these openly is part of the threat model, not a gap in it.

- **Not defending against ISP/state-level traffic analysis.** TLS in transit is the assumed baseline; building custom traffic-obfuscation (e.g. Tor-style routing) is out of scope for this project.
- **Not building DDoS-resistant infrastructure for the MVP.** A real deployment would sit behind an CDN/WAF with rate limiting; this project demonstrates the application-layer
