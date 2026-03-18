# 后端项目脚手架（NestJS + MySQL + Redis）

## 1. 推荐目录结构
```txt
backend/
  package.json
  tsconfig.json
  nest-cli.json
  .env.example
  src/
    main.ts
    app.module.ts
    common/
      constants/
      dto/
      enums/
      exceptions/
      guards/
      interceptors/
      pipes/
      utils/
    config/
      app.config.ts
      db.config.ts
      redis.config.ts
      storage.config.ts
      weather.config.ts
      map.config.ts
      voice.config.ts
    modules/
      auth/
        auth.module.ts
        auth.controller.ts
        auth.service.ts
      user/
        user.module.ts
        user.controller.ts
        user.service.ts
        entities/
      child/
        child.module.ts
        child.controller.ts
        child.service.ts
        entities/
      feeding/
        feeding.module.ts
        feeding.controller.ts
        feeding.service.ts
        rules/
      outfit/
        outfit.module.ts
        outfit.controller.ts
        outfit.service.ts
      recommend/
        recommend.module.ts
        recommend.controller.ts
        recommend.service.ts
      schedule/
        schedule.module.ts
        schedule.controller.ts
        schedule.service.ts
        jobs/
      health/
        health.module.ts
        health.controller.ts
        health.service.ts
      expense/
        expense.module.ts
        expense.controller.ts
        expense.service.ts
        report.service.ts
      school/
        school.module.ts
        school.controller.ts
        school.service.ts
      voice/
        voice.module.ts
        voice.controller.ts
        voice.service.ts
        intents/
    infra/
      mysql/
      redis/
      queue/
      storage/
      map/
      weather/
      voice/
    tasks/
      reminder.processor.ts
      report.processor.ts
  test/
    unit/
    integration/
```

## 2. 模块职责
1. `auth`：微信登录、JWT签发与刷新、鉴权中间件。
2. `user`：家长账号、家庭成员管理。
3. `child`：儿童档案（年龄阶段、过敏信息、成长基础数据）。
4. `feeding`：分龄吃法规则、每日推荐生成。
5. `outfit`：天气联动穿搭品牌推荐与对比。
6. `recommend`：附近玩乐综合推荐（天气 + 距离 + 预算 + 年龄）。
7. `school`：学校检索、对比、政策快照与入学日历。
8. `schedule`：提醒事件、模板计划、消息调度。
9. `health`：健康记录、趋势聚合、异常提示。
10. `expense`：记账、预算、统计报表。
11. `voice`：ASR文本接入、意图识别、槽位提取、指令路由。

## 3. 工程规范
1. API 版本化：`/api/v1`。
2. DTO 校验：`class-validator` + 全局 ValidationPipe。
3. 统一返回结构：`{ code, message, data, requestId }`。
4. 日志：按请求维度注入 `requestId`，错误日志脱敏。
5. 幂等：写接口支持 `Idempotency-Key`。

## 4. 配置与环境变量（最小集）
```bash
NODE_ENV=development
PORT=3000
JWT_SECRET=replace_me
JWT_EXPIRES_IN=2h
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=replace_me
DB_NAME=parenting_app
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
COS_BUCKET=replace_me
COS_REGION=replace_me
MAP_API_KEY=replace_me
WEATHER_API_KEY=replace_me
VOICE_ASR_KEY=replace_me
VOICE_TTS_KEY=replace_me
```

## 5. 启动顺序建议
1. 初始化数据库并执行 `database_ddl.sql`。
2. 启动 Redis（提醒和报表队列依赖）。
3. 启动后端服务。
4. 小程序联调 `GET /api/v1/dashboard/today` 与语音接口。
