# 养娃管家项目（全栈）

## 目录
- `backend/` NestJS 后端
- `frontend/` React + Vite 前端
- `deliverables/` PRD、原型、技术文档

## 快速启动
### 1. 启动后端
```bash
cd backend
./scripts/start_local.sh
```

### 2. 启动前端
```bash
cd frontend
cp .env.example .env
npm install --no-audit --no-fund --legacy-peer-deps --cache .npm-cache
npm run dev
```

### 3. 一键启动（前后端）
```bash
cd /Users/zhangxiaomei/zhangxiaomei_test
./scripts/dev_all.sh
```

## 当前已实现接口
- `GET /api/v1/dashboard/today`
- `GET /api/v1/recommend/places`
- `GET /api/v1/recommend/schools`
- `GET /api/v1/health/summary`
- `POST /api/v1/expenses`
- `GET /api/v1/expenses/summary`
- `POST /api/v1/schedule/events`
- `POST /api/v1/voice/parse`
- `POST /api/v1/voice/execute`

## 云服务器生产部署（kidcarepro.com）

已提供部署文件：
- `backend/Dockerfile`
- `frontend/Dockerfile`
- `deploy/docker-compose.prod.yml`
- `deploy/Caddyfile`
- `scripts/deploy_prod_server.sh`

服务器上执行：
```bash
cd /path/to/zhangxiaomei_test
./scripts/deploy_prod_server.sh
```

部署前请确保：
1. `kidcarepro.com` 与 `www.kidcarepro.com` 的 A 记录已指向服务器公网 IP
2. 服务器已开放 `80/443` 端口
3. 已安装 `docker` 与 `docker compose`
