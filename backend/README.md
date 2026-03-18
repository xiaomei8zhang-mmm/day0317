# 养娃管家后端（NestJS）

## 1. 初始化
```bash
cd backend
cp .env.example .env
npm install
```

`DISABLE_DB=true` 时可不连接 MySQL，适合先做接口联调。

## 2. 启动
```bash
npm run start:dev
```

服务默认运行在 `http://localhost:3000`。
Swagger 文档：`http://localhost:3000/api/docs`

## 3. 已打通接口
```bash
GET /api/v1/dashboard/today?childId=101&city=beijing
GET /api/v1/feeding/recommendations?childId=101&date=2026-03-15
GET /api/v1/outfit/recommendations?temperature=11&rainProbability=20
GET /api/v1/nearby/places?city=beijing&weather=sunny
GET /api/v1/nearby/schools?city=beijing&stage=kindergarten_3_6
POST /api/v1/expenses
GET /api/v1/expenses/summary?range=month
GET /api/v1/recommend/places?city=beijing
GET /api/v1/recommend/schools?city=beijing&stage=kindergarten_3_6
GET /api/v1/schedule/events
PATCH /api/v1/schedule/events/:id/status
POST /api/v1/health/record
GET /api/v1/health/summary?childId=101
POST /api/v1/schedule/events
POST /api/v1/voice/parse
POST /api/v1/voice/execute
```

返回结构：
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_xxx",
  "data": {
    "date": "2026-03-15",
    "child": {},
    "weather": {},
    "outfit": {},
    "food": {},
    "upcomingEvents": [],
    "expenseSummary": {}
  }
}
```

## 4. 下一步建议
1. 接入 `deliverables/tech/database_ddl.sql` 建表。
2. 将 `dashboard.service.ts` 中 mock 数据替换为数据库聚合查询。
3. 新增 `expense/schedule/voice` 模块并按 `api_examples.md` 联调。

## 5. 一键启动与自检
```bash
./scripts/start_local.sh
```

新开一个终端执行：
```bash
./scripts/smoke_test.sh
```

完整接口回归（含异常场景）：
```bash
./scripts/full_api_test.sh
```
