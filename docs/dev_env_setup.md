# Windows Development Environment Setup Guide

This guide describes how to run the containerized development environment. You do not need to install Node.js, pnpm, or Git on your host machine; everything runs in Docker.

---

## Prerequisites

You only need **Docker Desktop** installed on your Windows host.

### 1. Install Docker Desktop
Open PowerShell as Administrator and run:
```powershell
winget install --id Docker.DockerDesktop -e --source winget --accept-package-agreements --accept-source-agreements
```
*Note: Restart your PC after installation completes to finalize WSL2 configuration.*

---

## Project Execution

Once Docker is installed:

### 1. Start the Environment
From the project root folder, run:
```bash
docker compose up -d
```
* The React client will build dependencies inside the container and serve at `http://localhost:5173`.
* The Radicale testing server runs at `http://localhost:5232`.

### 2. Live Editing (HMR)
You can edit any files in your host IDE (Antigravity). Changes are mapped inside the container, triggering Vite Hot Module Replacement (HMR) automatically via polling.

### 3. Run Unit Tests
To execute tests inside the running app container, execute:
```bash
docker compose exec app pnpm test
```
