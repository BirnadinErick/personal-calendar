# Personal Calendar & Todo Client

An offline-first, client-side React Single Page Application (SPA) designed to interface with a self-hosted Nextcloud CalDAV server.

---

## Developer Quick Start

This project runs entirely inside Docker. You only need Docker Desktop installed on your host system.

### 1. Start Dev Environment
From the project root directory, run:
```bash
docker compose up -d
```

This starts:
* **React App**: `http://localhost:5173` (with hot reloading enabled)
* **Radicale CalDAV Server**: `http://localhost:5232` (mock server for development)

### 2. Run Tests inside Container
```bash
docker compose exec app pnpm test
```

---

## Architectural Layout
* See [architecture.md](file:///c:/Users/me/Nextcloud2/Documents/personal-calendar/architecture.md) for technical decisions.
* See [instructions.md](file:///c:/Users/me/Nextcloud2/Documents/personal-calendar/instructions.md) for rules, conventions, and constraints.