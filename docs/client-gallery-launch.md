# Client-gallery integration — draft for review

## Included in this branch

- A Client Galleries navigation item on the existing home, portfolio, and services pages.
- A responsive `client-galleries.html` entry page using the current 8B logo, black/cream palette, Oswald/Inter fonts, and booking contact.
- A gallery-code handoff that is enabled only after an HTTPS gallery-service origin is configured.
- A responsive navigation adjustment for the additional link.

This is the website entry point, not the completed gallery backend. Do not merge it as a full client-delivery launch. No actual gallery service is configured; the entry page explains that code access is being prepared and directs existing clients to their delivery link or booking email. It does not collect passwords or pretend to authenticate clients.

The working sample gallery remains owner-private at https://eightb-client-galleries.info-c79e.chatgpt.site. No client files are added to this public repository.

## Required before activating real client deliveries

1. Select the access experience: gallery link + password, email login, or invited ChatGPT sign-in. A private Sites deployment currently requires ChatGPT sign-in. A password-only experience needs a service that supports that access model.
2. Connect private photo storage and a database. GitHub Pages serves the website but does not provide server-side password checks, uploads, or private original files.
3. Implement an authenticated owner dashboard to create galleries, upload edited images, choose covers, control downloads, expire galleries, and revoke access.
4. Authorize every image, thumbnail, individual download, and ZIP server-side. A hidden gallery page, JavaScript password check, or difficult-to-guess public file URL is not sufficient protection.
5. Test that one client cannot access another gallery, direct original-file requests are blocked, expiration/revocation takes effect, and downloads work on iPhone and desktop.
6. Configure only the public HTTPS service origin in `assets/js/client-galleries-config.js`. Keep credentials and client records out of this repository.
7. Review the final working delivery flow and costs, then connect an approved branded subdomain if desired and merge the website navigation change.

## Scope and publication

The CNAME, main website hosting, booking form, portfolio image files, and DNS are unchanged. The branch is staged for review and must not be presented as launched client-gallery functionality. Client-specific uploads and access controls remain to be implemented.
