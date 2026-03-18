# 养娃管家 TDD（后端重构版 v1.0）

> 对齐文档：`doc/PRD_养娃管家_v1.0.md`、`deliverables/prototype/index.html`  
> 后端框架：`NestJS + TypeScript`  
> 联调目标：提供完整核心 API、统一返回结构、可直接供前端联调与冒烟。

---

## 1. 重构目标

- 按 PRD 补齐核心域接口：Dashboard、Feeding、Outfit、Nearby、Schedule、Health、Expense、Voice。
- 保持与现有前端兼容：保留 `recommend/*` 路由，同时新增标准路由 `nearby/*`。
- 提供接口文档能力：Swagger 在线文档 + 本文档联调示例。
- 不依赖数据库也可联调：使用内存数据仓（`mock-db`）保证本地快速联调。

---

## 2. 当前实现架构

## 2.1 模块清单

- `dashboard`：今日看板聚合
- `feeding`：分龄吃法推荐与过敏过滤
- `outfit`：天气驱动穿搭建议
- `nearby`：附近玩乐/学校推荐
- `recommend`：兼容层（转发到 `nearby`）
- `schedule`：日程创建、查询、状态更新
- `health`：健康记录新增、趋势与告警
- `expense`：记账、统计、预算预警
- `voice`：语音意图解析与动作执行

## 2.2 全局规范

- 全局前缀：`/api/v1`
- 统一响应：

```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_xxx",
  "data": {}
}
```

- 输入校验：`ValidationPipe(whitelist + transform + forbidNonWhitelisted)`
- 文档入口：`/api/docs`（Swagger UI）

---

## 3. 关键业务规则落地

- 吃法推荐支持过敏原过滤，输出替代方案。
- 穿搭规则：温度 <= 8°C 提升层数；降水概率 >= 60% 推荐防水外层。
- 推荐规则：空气质量差或下雨时提高室内场所优先级。
- 日程规则：支持 7/3/1/当天提醒偏移，逾期自动识别为 overdue。
- 健康规则：体温 >= 38°C 触发告警文案。
- 花销规则：预算使用率 >= 90% 输出预警。
- 语音规则：支持查询与操作意图，操作类意图返回确认语义与执行结果。

---

## 4. 接口文档（联调版）

## 4.1 Dashboard

### GET `/api/v1/dashboard/today`

- Query：`childId?`、`city?`
- 用途：首页看板聚合（天气、吃法、穿搭、提醒、花销）

---

## 4.2 Feeding

### GET `/api/v1/feeding/recommendations`

- Query：`childId?`、`date?`、`allergens?`（逗号分隔）
- 返回：早餐/午餐/晚餐、加餐、营养目标、过敏过滤结果

---

## 4.3 Outfit

### GET `/api/v1/outfit/recommendations`

- Query：`childId?`、`temperature?`、`rainProbability?`
- 返回：分层建议、防水建议、品牌对比（最多 3 个）

---

## 4.4 Nearby（标准路由）

### GET `/api/v1/nearby/places`

- Query：`city?`、`lat?`、`lng?`、`weather?`、`aqi?`
- 返回：天气模式（`weatherMode`）+ 场所列表

### GET `/api/v1/nearby/schools`

- Query：`city?`、`stage?`、`budget?`
- 返回：学校列表 + 合规信息（来源、更新时间、提示）

---

## 4.5 Recommend（兼容路由）

### GET `/api/v1/recommend/places`

- 兼容前端旧接口，内部转发至 `nearby/places`

### GET `/api/v1/recommend/schools`

- 兼容前端旧接口，内部转发至 `nearby/schools`

---

## 4.6 Schedule

### GET `/api/v1/schedule/events`

- Query：`status?`（`pending/completed/overdue`）
- 返回：事件列表与总数

### POST `/api/v1/schedule/events`

- Body：

```json
{
  "childId": 101,
  "eventType": "checkup",
  "title": "儿保复查",
  "eventTime": "2026-03-17 10:00:00",
  "location": "朝阳妇幼保健院",
  "note": "携带疫苗本",
  "remindOffsets": [10080, 4320, 1440, 0]
}
```

### PATCH `/api/v1/schedule/events/:id/status`

- Body：

```json
{
  "status": "completed"
}
```

---

## 4.7 Health

### POST `/api/v1/health/record`

- Body：

```json
{
  "childId": 101,
  "recordTime": "2026-03-16 08:30:00",
  "weightKg": 13.5,
  "heightCm": 90.3,
  "temperatureC": 37.2,
  "sleepHours": 10.4,
  "note": "状态良好"
}
```

### GET `/api/v1/health/summary`

- Query：`childId?`
- 返回：最新指标、趋势、告警列表

---

## 4.8 Expense

### POST `/api/v1/expenses`

- Body：

```json
{
  "childId": 101,
  "amount": 89,
  "category": "diaper",
  "paidAt": "2026-03-15 11:08:00",
  "note": "尿不湿L码"
}
```

### GET `/api/v1/expenses/summary`

- Query：`range=month|quarter|year`
- 返回：总额、预算、使用率、分类占比

---

## 4.9 Voice

### POST `/api/v1/voice/parse`

- Body：

```json
{
  "sessionId": "voice_abc_001",
  "text": "这个月到目前花了多少钱"
}
```

- 支持意图（当前）：  
  `query_expense_total`、`query_today_outfit`、`query_nearby_school`、`query_today_food`、`create_expense`、`create_schedule`

### POST `/api/v1/voice/execute`

- Body：

```json
{
  "sessionId": "voice_abc_001",
  "intent": "query_expense_total",
  "slots": { "range": "month_to_date" }
}
```

---

## 5. 运行与联调说明

## 5.1 启动

```bash
cd backend
DISABLE_DB=true npm run start:dev
```

## 5.2 Swagger

- 浏览器打开：`http://127.0.0.1:3000/api/docs`

## 5.3 冒烟测试

```bash
cd backend
./scripts/smoke_test.sh
```

---

## 6. 已完成重构清单

- 新增模块：`feeding`、`outfit`、`nearby`
- 增强模块：`dashboard`、`schedule`、`health`、`expense`、`voice`
- 保留兼容：`recommend` 旧路由不破坏
- 新增文档：Swagger 在线文档与本 TDD

---

## 7. 下一步（生产化建议）

- 将内存数据仓替换为 MySQL + Redis（按 PRD 核心表建模）
- 增加鉴权与家庭数据隔离（user/family/member）
- 接入真实天气、地图、ASR/NLU 服务
- 增加 e2e 自动化测试与 CI 质量门禁

---

## 8. 联调参数矩阵（补全）

> 以下为当前后端代码真实支持的参数定义，可直接按表联调。

### 8.1 `GET /api/v1/dashboard/today`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | query | 否 | string(number) | 孩子 ID，默认 `101` |
| city | query | 否 | string | 城市名，默认 `北京` |

### 8.2 `GET /api/v1/feeding/recommendations`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | query | 否 | string(number) | 孩子 ID |
| date | query | 否 | string | 日期，示例 `2026-03-15` |
| allergens | query | 否 | string | 过敏原，逗号分隔，如 `花生,乳制品` |

### 8.3 `GET /api/v1/outfit/recommendations`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | query | 否 | string(number) | 孩子 ID |
| temperature | query | 否 | string(number) | 温度（摄氏度） |
| rainProbability | query | 否 | string(number) | 降水概率（0-100） |

### 8.4 `GET /api/v1/nearby/places`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| city | query | 否 | string | 城市 |
| lat | query | 否 | string(number) | 纬度 |
| lng | query | 否 | string(number) | 经度 |
| weather | query | 否 | string | 天气标识，如 `sunny/rainy` |
| aqi | query | 否 | string(number) | 空气质量指数 |

### 8.5 `GET /api/v1/nearby/schools`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| city | query | 否 | string | 城市 |
| stage | query | 否 | enum | `nursery_0_3/kindergarten_3_6/primary_6_12/middle_12_plus` |
| budget | query | 否 | string | 预算区间文本 |

### 8.6 `GET /api/v1/recommend/places`（兼容）

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| city | query | 否 | string | 兼容老前端 |
| stage | query | 否 | enum | 兼容层透传参数：`nursery_0_3/kindergarten_3_6/primary_6_12/middle_12_plus` |
| weather | query | 否 | string | 兼容老前端 |
| aqi | query | 否 | string(number) | 兼容老前端 |
| budget | query | 否 | string | 兼容层透传预算参数 |

### 8.7 `GET /api/v1/recommend/schools`（兼容）

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| city | query | 否 | string | 城市 |
| stage | query | 否 | enum | 同 `nearby/schools` |
| weather | query | 否 | string | 兼容层透传参数（当前不参与学校排序） |
| aqi | query | 否 | string(number) | 兼容层透传参数（当前不参与学校排序） |
| budget | query | 否 | string | 预算 |

### 8.8 `GET /api/v1/schedule/events`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| status | query | 否 | enum | `pending/completed/overdue` |

### 8.9 `POST /api/v1/schedule/events`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | body | 否 | number | 孩子 ID |
| eventType | body | 是 | enum | `vaccine/checkup/school/custom` |
| title | body | 是 | string | 标题 |
| eventTime | body | 是 | string | 事件时间 `YYYY-MM-DD HH:mm:ss` |
| location | body | 否 | string | 地点 |
| note | body | 否 | string | 备注 |
| remindOffsets | body | 是 | number[] | 提醒偏移（分钟），如 `[10080,4320,1440,0]` |

### 8.10 `PATCH /api/v1/schedule/events/:id/status`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| id | path | 是 | number | 事件 ID |
| status | body | 是 | enum | `pending/completed/overdue` |

### 8.11 `POST /api/v1/health/record`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | body | 否 | number | 孩子 ID |
| recordTime | body | 是 | string | 记录时间 |
| weightKg | body | 否 | number | 体重（1-50） |
| heightCm | body | 否 | number | 身高（30-220） |
| temperatureC | body | 否 | number | 体温（34-43） |
| sleepHours | body | 否 | number | 睡眠时长（0-24） |
| note | body | 否 | string | 备注 |

### 8.12 `GET /api/v1/health/summary`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | query | 否 | string(number) | 孩子 ID |

### 8.13 `POST /api/v1/expenses`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| childId | body | 否 | number | 孩子 ID |
| amount | body | 是 | number | 金额，必须 `> 0` |
| category | body | 是 | enum | `food/diaper/clothing/medical/education/toy/travel/other` |
| paidAt | body | 是 | string | 支付时间 |
| note | body | 否 | string | 备注 |

### 8.14 `GET /api/v1/expenses/summary`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| range | query | 否 | enum | `month/quarter/year`，默认 `month` |

### 8.15 `POST /api/v1/voice/parse`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| sessionId | body | 是 | string | 会话 ID |
| text | body | 是 | string | 识别文本 |

### 8.16 `POST /api/v1/voice/execute`

| 参数 | 位置 | 必填 | 类型 | 说明 |
|---|---|---|---|---|
| sessionId | body | 是 | string | 会话 ID |
| intent | body | 是 | string | 意图名 |
| slots | body | 是 | object | 槽位参数 |

# 养娃管家技术实现方案（基于 PRD + 高保真原型）

> 输入依据：`doc/PRD_养娃管家_v1.0.md`、`deliverables/prototype/index.html`  
> 目标：落地一套可上线、可扩展、可观测的完整实现方案（小程序端 + 服务端 + 数据 + 交付）。

---

## 1. 总体方案与技术选型

- **前端（小程序）**：`Taro + React + TypeScript + Vite`  
  - 原型交互接近卡片式信息流，React 组件化更适配
  - 后续可复用部分逻辑到 H5（运营页/后台）
- **后端**：`NestJS + TypeScript + TypeORM`
- **数据库**：`MySQL 8`
- **缓存与队列**：`Redis + BullMQ`
- **对象存储**：`COS/OSS`（健康报告、凭证上传）
- **地图天气能力**：腾讯地图 API + 天气服务 API
- **语音能力**：微信同声传译/云厂商 ASR + NLU（首版可规则+词典）
- **部署**：`Docker + Nginx + CI/CD`（GitHub Actions/GitLab CI）

---

## 2. 架构设计（分层与模块）

### 2.1 逻辑架构
- **客户端层**：页面、组件、状态管理、权限与埋点
- **API 网关层（NestJS）**：鉴权、限流、参数校验、统一响应
- **业务域层**：
  - Dashboard（聚合）
  - Feeding（分龄吃法）
  - Outfit（穿搭推荐）
  - Nearby（玩乐/学校）
  - Schedule（提醒）
  - Health（健康）
  - Expense（花销）
  - Voice（语音解析与执行）
- **基础能力层**：用户家庭体系、消息通知、文件上传、配置中心
- **数据层**：MySQL、Redis、对象存储、日志系统

### 2.2 服务边界建议（先模块化单体）
- 单体内按模块拆包，避免早期微服务复杂度
- 当语音、推荐计算量上升后可拆：
  - `voice-service`（ASR/NLU）
  - `recommend-service`（吃法/穿搭/POI排序）

---

## 3. 原型页面到技术模块映射

- `首页看板` → `dashboard` 聚合接口，组合天气/吃法/提醒/花销/推荐
- `分龄吃法` → `feeding`，按年龄段+过敏源过滤+替代方案
- `附近推荐（玩乐/学校）` → `nearby`，地图检索+天气权重+阶段筛选
- `日程提醒` → `schedule`，模板事件+多级提醒+逾期流转
- `健康管理` → `health`，指标记录+趋势计算+异常规则
- `花销报表` → `expense`，记账、预算、分类占比、趋势
- `语音弹层` → `voice`，`parse`（意图识别）+`execute`（业务执行）

---

## 4. 前端实现方案（小程序端）

## 4.1 工程结构
- `src/pages`：`home/feeding/recommend/schedule/health/expense/profile`
- `src/modules`：业务复用块（预算条、提醒卡片、语音组件）
- `src/services`：接口请求封装、DTO 映射
- `src/store`：用户、家庭、当前 child、全局筛选条件
- `src/hooks`：权限、定位、天气、语音录制、分页
- `src/components`：通用卡片、空态、错误态、图表容器

## 4.2 状态与请求
- 服务端状态：`TanStack Query`
- 本地状态：`Zustand`
- 表单：`react-hook-form + zod`
- 防重提交：关键写接口带 `Idempotency-Key`

## 4.3 页面关键交互
- 首页：卡片骨架屏并行加载；24h 内到期提醒红点高亮
- 推荐页：地图/列表双态；筛选项（距离/预算/年龄）可回填
- 日程页：模板快速创建（疫苗/儿保/入学）
- 健康页：周/月/季度切换图表
- 花销页：预算使用率进度条 + 超 90% 警示
- 语音：按住说话 -> 识别结果 -> 意图 -> 执行确认（高风险操作二次确认）

---

## 5. 后端实现方案（NestJS）

## 5.1 模块目录
- `modules/auth`
- `modules/user`
- `modules/family`
- `modules/dashboard`
- `modules/feeding`
- `modules/outfit`
- `modules/nearby`
- `modules/schedule`
- `modules/health`
- `modules/expense`
- `modules/voice`
- `modules/notification`
- `modules/file`

## 5.2 核心中间件
- 全局参数校验（ValidationPipe）
- 统一响应拦截器（`code/message/data/requestId`）
- 全局异常过滤器（错误码分层）
- JWT 鉴权守卫 + 家庭作用域守卫（`familyId` 数据隔离）
- 限流（语音与写接口）

## 5.3 异步任务
- 提醒触达任务（BullMQ）
- 账单 CSV 导出任务
- 学校/POI 数据更新任务
- 天气缓存刷新任务

---

## 6. 数据模型设计（核心表）

- 用户与家庭：`user`、`family_member`、`child_profile`
- 推荐：`feeding_recommendation`、`outfit_brand`、`poi_place`、`school_profile`
- 记录：`schedule_event`、`health_record`、`expense_record`
- 语音：`voice_intent_log`
- 补充建议表：
  - `expense_budget`（预算）
  - `event_reminder_log`（提醒触达记录）
  - `school_policy_snapshot`（政策来源快照）

**索引重点**：
- `family_id + child_id + date`
- `schedule_event(event_time, status)`
- `expense_record(expense_date, category)`
- `school_profile(stage, geohash/distance_tag)`

---

## 7. API 设计（MVP）

- `GET /dashboard/today`
- `GET /feeding/recommendations?childId&date`
- `GET /outfit/recommendations?weather&childId`
- `GET /nearby/places?lat&lng&weather&ageStage`
- `GET /nearby/schools?stage&lat&lng&budget`
- `POST /schedule/event`
- `PATCH /schedule/event/:id/status`
- `POST /health/record`
- `POST /expense`
- `GET /expense/summary?range=month`
- `POST /voice/parse`
- `POST /voice/execute`

**统一返回**：
```json
{ "code": 0, "message": "ok", "data": {}, "requestId": "..." }
```

---

## 8. 关键业务规则落地

- 过敏源命中菜品必须过滤，并提供至少 1 个替代方案
- 温度 <= 8°C 推荐两层+；降水概率 >= 60% 优先防水外层
- 低龄（<=3岁）推荐半径优先 3km
- 提醒默认 7/3/1/当天，单事件单日最多 2 次触达
- 体温 >= 38°C 触发健康提醒
- 月预算使用率 >= 90% 触发预警
- 语音涉及删除/批量修改必须二次确认

---

## 9. 权限、安全与合规

- 小程序权限闭环：定位、订阅消息、麦克风、文件
- 数据安全：
  - 传输 HTTPS
  - 敏感字段加密存储
  - 原始语音默认不长期保存，仅保留结构化日志
- 合规展示：
  - 学校/政策展示来源与更新时间
  - 页面固定提示“以主管部门最新公告为准”
- 审计：
  - 高风险操作保留审计日志（用户、时间、操作前后快照）

---

## 10. 可观测性与埋点

- 前端埋点：首页卡片点击、推荐点击/收藏、提醒创建/完成、语音链路、记账成功率
- 后端日志：`requestId/userId/familyId/module/latency/errorCode`
- 指标监控：
  - API P95
  - 任务队列堆积
  - 语音识别成功率
  - 提醒触达成功率
- 告警阈值：
  - 核心可用性 < 99.9%
  - 语音成功率显著下降
  - 提醒任务延迟 > 5 分钟

---

## 11. 测试方案

- 单元测试：业务规则（过敏过滤、预算预警、提醒频控、语音路由）
- 集成测试：数据库读写、事务、索引查询
- E2E 测试（核心链路）：
  - 登录 -> 首页看板
  - 创建提醒 -> 到期状态更新
  - 记账 -> 本月汇总更新
  - 语音 parse -> execute
- 质量门禁：`lint + type-check + unit + e2e-smoke + build`

---

## 12. 性能目标与实现

- 首屏 <= 2s（4G）
- API 网关 p95 < 300ms（聚合接口 < 600ms）
- 技术手段：
  - Dashboard 聚合并行 + Redis 缓存
  - 推荐列表分页与增量加载
  - 静态资源压缩与按需加载
  - 热点查询结果短缓存（天气、POI）

---

## 13. CI/CD 与环境

- 环境：`dev / staging / prod`
- 发布流程：
  - PR 检查 -> 自动构建 -> 自动测试 -> Staging 冒烟 -> 生产灰度
- 数据库迁移：TypeORM migration，禁止手改线上结构
- 回滚：
  - 应用版本秒级回滚
  - 数据迁移采用向后兼容策略（先加后切）

---

## 14. 里程碑实施计划（16 周）

- **M1（1-2周）**：方案冻结、数据模型、脚手架、鉴权与基础设施
- **M2（3-8周）**：首页、吃法、提醒、记账、玩乐推荐、语音查询 MVP
- **M3（9-12周）**：穿搭对比、健康趋势、报表增强、语音操作
- **M4（13-16周）**：学校推荐、入学日历、学校对比、米家接入评估

---

## 15. 风险与应对

- 学校/政策数据准确性：来源标注 + 更新时间 + 快照留存
- 语音误判：操作确认 + 可撤销 + 灰度意图发布
- 冷启动数据不足：默认模板 + 引导补全 child profile
- 模块复杂度高：聚焦 MVP 闭环，按业务价值分期发布

---

## 16. 交付物清单（建议）

- 技术方案文档（本文件）
- API OpenAPI 文档
- ER 图与 migration 脚本
- 前端页面与组件清单
- 监控与埋点事件字典
- 测试计划与用例矩阵
- 上线与回滚手册

---