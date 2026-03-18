#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_DIR="$ROOT_DIR/deploy"

if ! command -v docker >/dev/null 2>&1; then
  echo "[error] docker 未安装"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "[error] docker compose 不可用"
  exit 1
fi

echo "[info] 进入部署目录: $DEPLOY_DIR"
cd "$DEPLOY_DIR"

echo "[info] 构建并启动生产服务..."
docker compose -f docker-compose.prod.yml up -d --build

echo "[info] 当前服务状态:"
docker compose -f docker-compose.prod.yml ps

echo "[done] 部署完成。请确认 DNS 已将 kidcarepro.com 与 www.kidcarepro.com 解析到当前服务器。"
