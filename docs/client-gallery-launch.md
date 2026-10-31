# Client galleries — staged for launch

## Selected client access

Clients will use a private gallery link and a gallery-specific password. They will not need an account for the production delivery flow. The current Sites build remains owner-private, so its outer preview access gate still requires the owner’s ChatGPT sign-in. Do not publish the original private prototype as a shortcut.

## Implemented privately

The working build at https://eightb-client-galleries.info-c79e.chatgpt.site now includes:

- `/admin`: an owner dashboard to create galleries, upload original JPG/PNG/WebP files, generate previews, choose covers, manage downloads, set expiration, change passwords, revoke access, and copy delivery details.
- `/g/<gallery-id>`: a server-checked gallery password, responsive grid, enlarged viewing, local-browser favorites, individual original downloads, and streamed gallery/favorites ZIP downloads.
- Private file storage and database records. Every preview, original, and ZIP request checks gallery authorization, state, expiration, and password version.
- Hashed passwords and session tokens, HttpOnly/SameSite cookies, failed-password rate limits, and owner-only write authorization.
- The original stock-photo design sample at `/demo/index.html`.

Only sample imagery is included. There are no real client deliveries. Backend checks passed against real local D1/R2 bindings, including cross-gallery restrictions, password rotation, revocation, expiry, download controls, logout, and ZIP integrity. Client password entry, viewing, locking, favorites, and download choices were checked in desktop and phone browser layouts.

## What this GitHub branch changes

This branch adds the branded `client-galleries.html` entry page and Client Galleries navigation links on the existing home, portfolio, and services pages. The code-handoff form is enabled only after an HTTPS gallery-service origin is configured in `assets/js/client-galleries-config.js`.

The service origin remains blank, and this PR remains a draft. The upload dashboard and protected file service live in the private Sites source repository, not in this public website repository. No client files, gallery passwords, credentials, CNAME, DNS, or booking-form destinations are changed here.

## Remaining production activation

1. Review the private studio and client flow using sample photographs.
2. Approve a separate client-facing service deployment that accepts anonymous visitors at the outer hosting layer while retaining gallery-password checks and owner-only administration. Keep the original prototype owner-private.
3. Confirm production storage/hosting terms, configure the approved HTTPS origin in this branch, and merge the entry-page/navigation integration only when real delivery access is working.
4. If desired, connect an approved branded subdomain such as `gallery.8bproduction.com`. The main public website can stay on its current hosting.

Do not upload private client images to this public GitHub repository. GitHub Pages serves the website entry page; the connected service protects and delivers client collections.
