# Dougal Matthews

A minimal personal website.

A more minimal README.

## Frontend Observability

Grafana Faro is bundled from `faro.js` and only initializes when
`faro-config.js` contains a non-empty collector endpoint.

The bundle enables the standard Faro Web SDK instrumentations, experimental
navigation tracking, all resource timing, tracing, and session replay. Replay
sampling is set to 100% of sampled sessions. Text and input masking are
disabled for replay.

After applying Terraform in the `ha` repo, Terraform manages the GitHub Actions
secret `GRAFANA_FARO_COLLECTOR_ENDPOINT` from:

```bash
terraform output -json frontend_o11y_apps | jq -r '.dougalmatthews_com.collector_endpoint'
```

Terraform also exposes the matching app key for operator checks, but the site
expects only the full collector endpoint:

```bash
terraform output -json frontend_o11y_app_keys | jq -r '.dougalmatthews_com'
```

The collector endpoint is a public browser ingest URL. It is stored as a GitHub
Actions secret only to keep the generated app key out of git history.

Build the browser bundle with:

```bash
npm ci
npm run build
```

Do not commit a real collector endpoint to `faro-config.js`.
