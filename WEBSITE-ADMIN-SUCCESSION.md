# Website admin succession plan

**Purpose:** Ensure Riverbend Medieval Society Inc. can keep the public website running when the current website admin steps down, is unavailable, or hands the role to someone else.

**Last reviewed:** 2026-07-25  
**Status:** Draft — fill the *To confirm* items with the committee, then treat this as the living handover brief.

**Related docs:**
- [PHOTO-ALBUMS-ADMIN.md](PHOTO-ALBUMS-ADMIN.md) — Google Photos album workflow
- [version-log.html](version-log.html) — public changelog of site updates

---

## 1. Principles

1. **Club-owned accounts, not personal ones.** Prefer `website.riverbendmedieval@gmail.com`, the `riverbend-medieval` GitHub account, and society-controlled domain/DNS over a member’s personal email or GitHub user as the sole owner.
2. **Two people who can publish.** At least one primary and one backup should be able to edit, commit, and push (or approve) site updates.
3. **No single point of failure for recovery.** Recovery email, 2FA backup codes, and domain registrar login must be known to the Secretary (or President) and stored offline in the society’s secure records — never only in one person’s head or phone.
4. **Passwords and 2FA codes do not live in this git repo.** This file lists *what* exists and *who* should hold access, not secrets.

---

## 2. Asset inventory

### 2.1 Public website (confirmed)

| Item | Detail |
|---|---|
| Live URL | https://riverbend-medieval.org.au/ |
| Custom domain | `riverbend-medieval.org.au` (see `CNAME` in repo) |
| Hosting | **GitHub Pages** from branch `main`, path `/` |
| Repository | https://github.com/riverbend-medieval/riverbend-medieval.github.io |
| Repo visibility | Public |
| Site type | Static HTML / CSS / JS (no build step required for normal content edits) |

### 2.2 GitHub access (confirmed as of 2026-07-25)

| Account | Role on this repo |
|---|---|
| `riverbend-medieval` | Owner / admin (GitHub **User** account, not an Organization) |
| `MedievalSteve` | Collaborator with **write** (push) — not admin |

**Risk:** The owner is a personal-style User account named for the club. If that login is lost, repo ownership and Pages/DNS settings are hard to recover. Long-term preference: move the repo under a GitHub **Organization** owned by the society, with at least two org owners.

### 2.3 Website Gmail + photos (confirmed)

| Item | Detail |
|---|---|
| Account | `website.riverbendmedieval@gmail.com` |
| Used for | Google Photos event albums; site admin tooling tied to this mailbox |
| Album links | Stored in [`photo-albums.js`](photo-albums.js) (public share URLs) |
| Workflow | [PHOTO-ALBUMS-ADMIN.md](PHOTO-ALBUMS-ADMIN.md) |

### 2.4 Public contact (confirmed)

| Item | Detail |
|---|---|
| Society contact on site | `secretary.rms.medieval@gmail.com` |
| Note | Separate from the website admin Gmail; used for membership/enquiries |

### 2.5 Search / verification (confirmed in repo)

| Item | Detail |
|---|---|
| Google Search Console | Verification file `google745fb7a414928dbd.html` in repo root |
| Bing Webmaster | Meta tag `msvalidate.01` = `037D084B7904CC30CA04919EF1316FC0` on pages |

### 2.6 Social (confirmed on site)

| Item | Detail |
|---|---|
| Facebook Page | https://www.facebook.com/profile.php?id=61556601099042 (embedded on several pages) |

### 2.7 To confirm (committee must fill)

| Item | Owner / where recorded | Notes |
|---|---|---|
| Domain registrar for `riverbend-medieval.org.au` | | Who pays renewal? Expiry date? |
| DNS host (if different from registrar) | | GitHub Pages needs A / AAAA / CNAME records |
| GitHub `riverbend-medieval` password + 2FA | Society secure store | Recovery codes location |
| Website Gmail password + 2FA + recovery email/phone | Society secure store | Must allow Photos + future Drive backup |
| Google Search Console login | | Usually the website Gmail or a committee Google account |
| Bing Webmaster login | | Same |
| Facebook Page admin roles | | At least two society admins |
| Local clone / Cursor / tooling on outgoing admin’s machine | | Optional; not required if GitHub + docs are enough |
| Any Netlify or other CDN account | | Not required for current GitHub Pages deploy; confirm none leftover |

---

## 3. Recommended roles

| Role | Responsibility | Suggested holder |
|---|---|---|
| **Website Admin (primary)** | Day-to-day content, photos, pushes to `main`, version log | Named member |
| **Website Admin (backup)** | Same skills; can publish if primary unavailable | Second named member |
| **Account Custodian** | Holds registrar + GitHub owner + website Gmail recovery (may be same as Secretary) | Secretary or President |
| **Content reviewers** | Supply event copy, persona text, approved photos | Event organisers / committee |

Name the current people here when the committee agrees:

- Primary Website Admin: _______________________
- Backup Website Admin: _______________________
- Account Custodian: _______________________
- Review date for this plan: _______________________

---

## 4. Minimum access the next admin needs

To keep the site alive, the successor needs:

1. **GitHub write access** to `riverbend-medieval/riverbend-medieval.github.io` (collaborator or org member).
2. Ability to **push to `main`** (or open PRs that an owner merges) — Pages publishes from `main`.
3. Access to **`website.riverbendmedieval@gmail.com`** for Photos (and Search Console if used there).
4. This document + [PHOTO-ALBUMS-ADMIN.md](PHOTO-ALBUMS-ADMIN.md).
5. Optional but important: domain/DNS access, or a documented contact who renews the domain.

Admin (GitHub owner) access is needed for: collaborator invites, Pages/custom domain settings, transferring ownership.

---

## 5. Day-to-day runbook (short)

### Edit and publish content

1. Clone or pull `main`.
2. Edit the relevant HTML / `styles.css` / `navigation.js` / `search.js` / `sitemap.xml` as needed.
3. For events with photos: follow [PHOTO-ALBUMS-ADMIN.md](PHOTO-ALBUMS-ADMIN.md) (album + cover + `photo-albums.js`).
4. Note the change in [version-log.html](version-log.html).
5. Commit and push to `main`. GitHub Pages rebuilds automatically (usually a few minutes).
6. Spot-check https://riverbend-medieval.org.au/ and hard-refresh if needed.

### Do not

- Commit multi‑GB photo dumps or `_google-photos-upload/` (gitignored staging only).
- Store passwords or 2FA codes in the repository.
- Force-push `main` unless recovering from a known bad deploy and the committee agrees.

### Useful local preview

```bash
cd riverbend-medieval.github.io
python3 -m http.server 8080
# open http://127.0.0.1:8080/
```

---

## 6. Handover checklist

Use this when changing Website Admin or Account Custodian.

### Before handover (outgoing)

- [ ] Update this file (names, review date, *To confirm* table).
- [ ] Confirm website Gmail recovery email/phone still works; print/store 2FA backup codes for the Custodian.
- [ ] Confirm GitHub owner 2FA backup codes stored with Custodian.
- [ ] Confirm domain auto-renew is on and payment method is society-controlled.
- [ ] List open content tasks (personas pending, events missing albums, etc.).
- [ ] Walk through one sample edit + push + Photos album update with the incoming admin.
- [ ] Add incoming admin as GitHub collaborator (**write** minimum).
- [ ] Add incoming admin to website Gmail (shared password via society process, or Google account access policy the club adopts).
- [ ] Add incoming admin as Facebook Page admin if they will manage embeds/posts.
- [ ] Remove or demote outgoing personal access only after the above is verified.

### After handover (incoming)

- [ ] Clone repo; run local preview; push a trivial version-log test (or commit with Custodian watching).
- [ ] Sign in to website Gmail; open Photos; confirm albums listed in `photo-albums.js` are visible.
- [ ] Confirm live site loads on custom domain over HTTPS.
- [ ] Confirm Search Console / Bing still show the property (if used).
- [ ] Schedule the next annual review of this plan (committee meeting).

### Emergency (admin unreachable)

1. Custodian uses stored recovery to access GitHub owner and/or website Gmail.
2. Add a new collaborator with write access.
3. If domain fails: Custodian logs into registrar/DNS and verifies GitHub Pages records.
4. Notify committee; update this file when stable.

---

## 7. Near-term hardening (recommended)

Prioritise these so succession is not fragile:

1. **Fill the *To confirm* table** (especially registrar and recovery locations).
2. **Second GitHub writer** who has actually completed a push to `main`.
3. **Printed/offline 2FA backup codes** for GitHub owner + website Gmail with the Secretary.
4. **Consider a GitHub Organization** for `riverbend-medieval` with two owners (reduces lockout risk).
5. **Replace Abbey 2026 cover** with a real event photo when convenient (`images/events/abbey2026/cover.jpg`).
6. **Annual review** of this plan at AGM or first committee meeting of the year.

---

## 8. Document control

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-07-25 | Initial draft from current repo + GitHub Pages inventory |
