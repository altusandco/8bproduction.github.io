# 8B Production — Portfolio Update

Current build includes:
- Official 8B Production logo
- Six photography portfolio images
- KVRT + TEZRIN artist images
- Instagram: @8b.productions
- Booking email: booking@8bproduction.com
- Full Book a Shoot inquiry form

## Important: activate the booking form
The booking form uses FormSubmit so it can work on GitHub Pages without a server.

After the site is live:
1. Submit the form once yourself.
2. FormSubmit will send an activation email to `booking@8bproduction.com`.
3. Open that email and confirm/activate the form.
4. After activation, future booking inquiries will be delivered to that inbox.

## GitHub Pages
1. Upload the contents of this folder to the root of your GitHub repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save.
6. Preview and test the full site before pointing `8bproduction.com` to GitHub Pages.

## Portfolio update

- `portfolio.html`: 16 curated photographs, category filters and an accessible enlargement dialog.
- `services.html`: photography services, inquiry process and FAQ.
- Existing homepage, music, contact form, domain and Instagram link preserved.
- Uploaded originals are untouched; gallery copies are resized for web delivery.
- Run `python build.py` to validate local links and stage the static preview.

## Apply to the existing GitHub Pages site

Upload the contents of the provided ZIP to the repository root, keeping the `assets` folder structure. Commit to the branch configured in GitHub Pages. Keep the existing `CNAME`. No DNS changes are needed.

The booking form still uses the original FormSubmit destination. Its activation and email delivery must be checked by the owner; no test inquiry was sent during this update.
