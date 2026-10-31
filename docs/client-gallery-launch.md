# 8B Production client galleries

Client Galleries is integrated with the existing photography website. The website entry page hands gallery codes to the connected delivery service; clients use a private link and a gallery-specific password, with no account required.

## Live service

- Client entrance: https://eightb-client-delivery.info-c79e.chatgpt.site
- Owner studio: https://eightb-client-delivery.info-c79e.chatgpt.site/admin
- Direct gallery links: `/g/<gallery-id>` on that service.

The owner studio requires the configured 8B owner's ChatGPT sign-in. Clients are not asked to sign in to ChatGPT. It supports gallery creation, original uploads, preview generation, covers, password changes, download controls, expiration, revocation, and copying delivery links/codes/passwords.

Every gallery record, preview image, original download, and ZIP request is checked server-side. Original files are private, passwords and session tokens are hashed, and client sessions use HttpOnly/SameSite cookies. The hosted adapter accepts only the configured owner identity for administrative actions. No validation endpoint or alternate service credential is deployed publicly.

The original prototype remains owner-private at https://eightb-client-galleries.info-c79e.chatgpt.site and uses separate storage. Its public demo assets are not included in production.

## Website configuration

`assets/js/client-galleries-config.js` contains only the public HTTPS service origin and the `/g/` path prefix. Never put private photo URLs, gallery passwords, client records, storage tokens, or other credentials in this public GitHub repository.

The CNAME, DNS, existing portfolio photographs, and booking-form destination are unchanged. Client delivery runs on the connected service; GitHub Pages continues to serve the main website and gallery entry page.

## Validation

- 63 checks against real local D1/R2 bindings, covering owner authorization, password changes, gallery isolation, expiration/revocation, download controls, logout, rate limits, and ZIP creation.
- Hosted production uploads tested with sample photographs before enabling public access.
- Anonymous browser verified the gallery-code handoff, password-only access, and actual JPG/ZIP downloads. Downloaded originals matched the uploaded bytes and ZIP CRC checks passed.
- Temporary validation routes were removed and verified absent before public client access.
- The studio supports 20 MB per image and 250 photographs / 1 GB per gallery. Favorites remain local to the client's browser.
