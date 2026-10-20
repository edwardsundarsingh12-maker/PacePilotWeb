# Running Tracker Partner â€” website

Static marketing site for the PacePilot Android app (`com.edapp.runningtracker`): Home, What's New, Privacy Policy, Terms of Service.

Live: https://edwardsundarsingh12-maker.github.io/PacePilotWeb/

## Preview
```
python -m http.server 8080
```
Open http://localhost:8080. Append `?inapp=1` to any page to see the in-app WebView view (no nav or footer).

## What to swap
- Play Store links: `https://play.google.com/store/apps/details?id=com.edapp.runningtracker` (placeholder until the listing is live).
- Screenshots: `assets/app-1.jpg` â€¦ `app-5.jpg`.
- Colours: tokens in `:root` at the top of `styles.css`.
- New release: copy an `<article class="release">` block at the top of the timeline in `whats-new.html`.

## Account deletion form
`delete-account.html` posts to FormSubmit (`https://formsubmit.co/ajax/<email>`), which emails the request. The page shows success only when FormSubmit answers `success: "true"`.
The first submission triggers a FormSubmit **activation email**; click it once or nothing is delivered. After activating, you can swap the email in `ENDPOINT` for the random alias FormSubmit gives you.

## Deploy
GitHub Pages serves the `main` branch root (Settings → Pages → Deploy from a branch). Pushing to `main` redeploys.
