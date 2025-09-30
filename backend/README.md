# Testudo Scraper Backend

This directory contains a standalone Python package that watches UMD Testudo section availability and emails subscribers when seats open up. It replaces the ad-hoc `script.py` with a deployable, configurable service that can run on low-power devices such as a Raspberry Pi.

## Features

- Polls Testudo at configurable cron intervals (multiple schedules supported)
- Uses MongoDB to read the `user-watches` collection produced by the Next.js app
- Applies per-section cooldowns so the same users are not spammed repeatedly
- Sends notification emails through any SMTP provider (Gmail, SES, Mailgun, etc.)
- Supports dry-run mode for safe testing
- Ships with tests, a Docker image, and systemd/docker-compose samples for self-hosting

## Quick start (Python virtual environment)

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows PowerShell use: .venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install .
cp .env.example .env
# edit .env with your secrets, then run once:
python -m testudo_scraper.cli run --once
```

### Required environment variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | Connection string for the MongoDB cluster that stores `user-watches` |
| `SMTP_USERNAME` | Username/login for your SMTP provider |
| `SMTP_PASSWORD` | Password or app password for SMTP |
| `EMAIL_FROM` | Email address that appears as the sender |

Recommended optional variables:

- `SCRAPER_TERM_ID` – Target Testudo term (default `202408`)
- `SCRAPER_CRON` – Semicolon-separated cron expressions; defaults mirror the original script (twice an hour while Testudo updates)
- `SCRAPER_NOTIFICATION_COOLDOWN_MINUTES` – Minimum minutes between alerts for the same section (default 60)
- `SCRAPER_REQUEST_TIMEOUT` – HTTP timeout in seconds (default 15)

See `pyproject.toml` for the full list of tunables.

### Dry runs

To verify parsing and Mongo connectivity without sending emails or updating cooldowns:

```bash
python -m testudo_scraper.cli run --once --dry-run --log-level DEBUG
```

### Continuous scheduling

```bash
python -m testudo_scraper.cli run
```

The default cron expressions poll every 30 minutes during the published Testudo update windows. Override with one or more `--cron "0 */1 * * *"` flags if you want your own schedule.

## Docker image

A multi-architecture Dockerfile is provided so you can run the scraper inside a container on Raspberry Pi, x86 servers, or cloud instances.

Build locally (ARM or x86):

```bash
docker build -t testudo-scraper:latest .
```

Run with environment variables from `.env`:

```bash
docker run --env-file .env --name testudo-scraper --restart unless-stopped testudo-scraper:latest
```

## docker-compose

The repository root contains `docker-compose.backend.yml` with a ready-to-run service definition:

```bash
docker compose -f ../docker-compose.backend.yml up -d
```

Edit `backend/.env` (ignored by Git) with your credentials beforehand.

## Systemd unit (bare-metal Pi)

`deploy/pi/testudo-scraper.service` shows how to run the scraper as a persistent systemd service:

1. Copy the repo to `/opt/testudo-tracker` on your Raspberry Pi.
2. Create and activate a Python virtual environment inside `backend/`.
3. Install the package (`pip install .`).
4. Copy the unit file to `/etc/systemd/system/testudo-scraper.service` and adjust the paths and user.
5. Enable + start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable testudo-scraper
sudo systemctl start testudo-scraper
sudo systemctl status testudo-scraper
```

## Tests

```bash
pip install .[dev]
pytest
```

## Troubleshooting

- Ensure your MongoDB Atlas IP allow-list includes the Raspberry Pi or container host.
- Gmail users must create an App Password and enable SMTP/“less secure apps.” Consider switching to a dedicated transactional email provider for production.
- Set `--log-level DEBUG` to inspect parsing output and cron activity.
