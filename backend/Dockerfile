# syntax=docker/dockerfile:1.5
ARG PYTHON_VERSION=3.11

FROM --platform=$BUILDPLATFORM python:${PYTHON_VERSION}-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml README.md ./
COPY src ./src

RUN pip install --upgrade pip \
    && pip install . \
    && rm -rf /root/.cache/pip

ENV TZ=America/New_York
ENV PYTHONPATH=/app

ENTRYPOINT ["testudo-scraper"]
CMD ["run"]
