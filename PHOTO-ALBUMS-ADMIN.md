# Google Photos albums (website admin)

**Account:** `website.riverbendmedieval@gmail.com`

Event photo archives live in Google Photos on this account. The website only keeps one `cover.jpg` per event in git and links to shared albums via `photo-albums.js`.

## Create / share an album

1. Sign in to [Google Photos](https://photos.google.com) as `website.riverbendmedieval@gmail.com`.
2. Create an album (name should match the event, e.g. `Abbey Medieval Festival 2026`).
3. Upload the full photo set (originals — do not commit multi‑GB dumps to git).
4. Open the album → **Share** → create a link → **Anyone with the link**.
5. Copy the share URL into `photo-albums.js` for that album’s `url` field.
6. Ensure `images/events/<slug>/cover.jpg` exists (one web-sized hero image).
7. If this is a new event, add a new object to `window.PHOTO_ALBUMS` in `photo-albums.js`.

## Albums to create (initial set)

| Album id | Suggested Photos album name |
|---|---|
| abbey2026 | Abbey Medieval Festival 2026 |
| fraser-pop2026 | Fraser Pop 2026 |
| aldershot2026 | Aldershot High Medieval 2026 |
| abbey2025 | Abbey Medieval Festival 2025 |
| fraser-pop2025 | Fraser Pop 2025 |
| aldershot-workshop2025 | Aldershot Workshop 2025 |
| makers-fair2025 | Gympie Rotary Heritage Maker's Fair 2025 |
| yule2025 | Aldershot Yule 2025 |

Until a share URL is pasted, the site shows “Album coming soon” for that event.

**Abbey 2026 cover:** `images/events/abbey2026/cover.jpg` currently uses the upcoming promo artwork as a stand-in. After you upload Abbey photos to Google Photos, replace this file with a real event photo (web-sized, ~1600px wide).

## Succession

Keep recovery email / 2FA current on the website Gmail so the next admin can access Photos.
