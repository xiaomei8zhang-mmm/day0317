#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

cleanup() {
  if [[ -n "${BACKEND_PID:-}" ]]; then
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
  fi
  if [[ -n "${FRONTEND_PID:-}" ]]; then
    kill "$FRONTEND_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT INT TERM

echo "[dev] 启动后端..."
(
  cd "$BACKEND_DIR"
  [[ -f .env ]] || cp .env.example .env
  DISABLE_DB=true npm run start:dev
) &
BACKEND_PID=$!

echo "[dev] 启动前端..."
(
  cd "$FRONTEND_DIR"
  [[ -f .env ]] || cp .env.example .env
  npm run dev
) &
FRONTEND_PID=$!

echo "[dev] 后端: http://127.0.0.1:3000"
echo "[dev] 前端: http://127.0.0.1:5173"
echo "[dev] 按 Ctrl+C 停止"

wait "$BACKEND_PID" "$FRONTEND_PID"
