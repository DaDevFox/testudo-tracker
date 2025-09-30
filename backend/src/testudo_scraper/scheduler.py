from __future__ import annotations

import logging
from typing import Iterable, Sequence

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger

from .service import ScraperService

_logger = logging.getLogger(__name__)


def _create_scheduler(timezone: str) -> BlockingScheduler:
    return BlockingScheduler(timezone=timezone)


def run_scheduler(service: ScraperService, cron_expressions: Sequence[str]) -> None:
    scheduler = _create_scheduler(service.settings.timezone)

    for expression in cron_expressions:
        trigger = CronTrigger.from_crontab(expression)
        scheduler.add_job(service.run_once, trigger=trigger)
        _logger.info("Scheduled scraper with cron '%s'", expression)

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        _logger.info("Stopping scheduler")
        raise
    finally:
        try:
            scheduler.shutdown(wait=False)
        except Exception:
            _logger.debug("Scheduler shutdown raised", exc_info=True)
        service.close()


__all__ = ["run_scheduler"]
