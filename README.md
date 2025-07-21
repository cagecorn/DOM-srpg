# DOM SRPG

This project contains a small strategy RPG prototype built with plain DOM elements. The code is meant to run directly in a browser and can be served as a static site.

## Running locally

Use a simple HTTP server (for example Python's built-in server) to test the game:

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080> in a browser.

## Deploying with GitHub Pages

GitHub Pages can host the game directly from the repository. The included workflow `deploy-pages.yml` deploys the contents of the repository whenever changes are pushed to the `main` branch. Enable GitHub Pages in the repository settings and choose **GitHub Actions** as the source.

Once enabled, the game will be available at:

```
https://<your-username>.github.io/DOM-srpg/
```

If you encounter a `404` message, ensure that Pages is enabled and the deployment succeeded.
