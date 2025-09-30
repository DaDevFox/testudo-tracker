from __future__ import annotations

import logging
from pathlib import Path
from typing import List, Optional

import typer

from .config import Settings, load_environment
from .scheduler import run_scheduler
from .service import ScraperService

app = typer.Typer(add_completion=False, help="Run the Testudo seat watcher service")


def _configure_logging(level: str) -> None:
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )


@app.command()
def run(
    *,
    cron: List[str] = typer.Option(
        None,
        "--cron",
        help="Cron expression(s) to use. Provide multiple --cron flags to register multiple schedules.",
    ),
    once: bool = typer.Option(False, help="Run a single poll cycle and exit."),
    dry_run: bool = typer.Option(
        False,
        help="Log notifications without sending emails or updating MongoDB cooldowns.",
    ),
    env_file: Optional[Path] = typer.Option(
        None,
        exists=True,
        file_okay=True,
        dir_okay=False,
        resolve_path=True,
        help="Optional .env file to load before running the scraper.",
    ),
    log_level: str = typer.Option(
        "INFO",
        help="Python logging level (e.g. DEBUG, INFO, WARNING).",
    ),
) -> None:
    """Start the scraper service."""

    _configure_logging(log_level)
    load_environment(env_file)
    settings = Settings.from_env(cron_override=cron)

    service = ScraperService(settings=settings, dry_run=dry_run)

    try:
        if once:
            service.run_once()
        else:
            run_scheduler(service, settings.cron)
    except (KeyboardInterrupt, SystemExit):
        logging.getLogger(__name__).info("Shutdown requested")
        raise typer.Exit(code=0)
    finally:
        service.close()


def main() -> None:  # pragma: no cover - console entrypoint
    app()


if __name__ == "__main__":  # pragma: no cover
    main()
