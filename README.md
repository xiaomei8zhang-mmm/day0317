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
