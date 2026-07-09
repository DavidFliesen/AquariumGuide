# The Aquarium Guide

A polished single-page web app for a South Carolina Aquarium visit in Charleston.

## Current update
- Removed the install button.
- Reworked the design so it more closely follows the feel of the South Carolina Aquarium website: clean white navigation, strong ocean-blue hero section, coral/gold calls to action, larger typography and card-based content.
- Kept the app as a normal webpage while retaining lightweight offline caching.
- Included the Aquarium's online map image for quick reference, with links back to the official map page.

## Run locally
Open `index.html` in a browser. For service-worker caching, serve it from a local web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy on GitHub Pages
1. Upload the folder contents to a GitHub repository.
2. In GitHub: Settings → Pages → Deploy from branch → main / root.
3. Open the GitHub Pages URL in Safari, Chrome, or Edge.

## Notes
This is a personal visit helper and is not affiliated with the South Carolina Aquarium. Verify hours, tickets, exhibits, map details and restaurant hours before going.
