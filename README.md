# Testudo Tracker

A Next.js app plus a Python scraper that keeps University of Maryland students informed when competitive courses open up.

## Structure

- `src/` – Next.js frontend with API routes for managing watches
- `backend/` – Python package that polls Testudo and emails users when seats open up
- `docker-compose.backend.yml` – Container definition for running the scraper service locally or on a Raspberry Pi
- `deploy/pi/` – Example systemd unit for bare-metal installs

## Frontend quick start

```bash
npm install
npm run dev
```

Create `.env.local` with at least `MONGODB_URI` (and any other secrets required by the Next.js app) before running.

## Backend quick start

See `backend/README.md` for full details. In short:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install .
cp .env.example .env
python -m testudo_scraper.cli run --once --dry-run
```

## Self-hosting the scraper on Raspberry Pi

Two supported approaches:

### Docker Compose (recommended)

```bash
cd /opt/testudo-tracker
cp backend/.env.example backend/.env  # edit secrets
docker compose -f docker-compose.backend.yml up -d --build
```

Docker will build a multi-arch image and keep the service running with automatic restarts.

### systemd + virtualenv

1. Install OS dependencies: `sudo apt update && sudo apt install python3-venv git`
2. Clone this repository to `/opt/testudo-tracker`
3. Follow the backend quick start to create `.venv`, install dependencies, and populate `backend/.env`
4. Copy `deploy/pi/testudo-scraper.service` to `/etc/systemd/system/`
5. Update the unit file paths/user if necessary, then run:

```bash
sudo systemctl daemon-reload
sudo systemctl enable testudo-scraper
sudo systemctl start testudo-scraper
sudo systemctl status testudo-scraper
```

## Running tests

- Frontend: `npm test`
- Backend: `cd backend && pip install .[dev] && pytest`