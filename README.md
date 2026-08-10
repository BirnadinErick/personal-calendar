# Personal Calendar & Todo Client

An offline-first, client-side React Single Page Application (SPA) designed to interface with a self-hosted Nextcloud CalDAV server.

---

## Developer Quick Start

### Prerequisites
* [pnpm](https://pnpm.io/)
* [Docker](https://www.docker.com/) (for running the local Radicale test server)

### 1. Spin up Local Radicale CalDAV Server
```bash
docker compose -f docker/docker-compose.yml up -d
```
Access the Radicale server UI at `http://localhost:5232`.

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```
Open `http://localhost:5173` in your browser.

### 4. Run Tests
```bash
pnpm test
```

---

## Architectural Layout
* See [architecture.md](file:///c:/Users/me/Nextcloud2/Documents/personal-calendar/architecture.md) for technical decisions.
* See [instructions.md](file:///c:/Users/me/Nextcloud2/Documents/personal-calendar/instructions.md) for rules, conventions, and constraints.

---

> this code base is my experiment to see how far i can get with just AI-agents acting as a junior
> developer.