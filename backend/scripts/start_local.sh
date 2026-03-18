#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  cp .env.example .env
  echo "[info] .env 不存在，已从 .env.example 创建。"
fi

if [[ ! -d node_modules ]]; then
  echo "[info] 正在安装依赖..."
  npm install --no-audit --no-fund --legacy-peer-deps --cache .npm-cache
fi

echo "[info] 启动后端服务：http://127.0.0.1:3000"
DISABLE_DB=true npm run start:dev
