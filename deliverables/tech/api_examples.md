# 关键接口 JSON 示例（/api/v1）

统一响应结构：
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_20260315_xxx",
  "data": {}
}
```

## 1) 今日看板
### Request
```http
GET /api/v1/dashboard/today?childId=101&city=beijing
Authorization: Bearer <token>
```

### Response
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_dashboard_001",
  "data": {
    "date": "2026-03-15",
    "child": { "id": 101, "name": "小米", "stage": "1_3y" },
    "weather": { "city": "北京", "condition": "晴", "temp": 11, "feelLike": 9 },
    "outfit": { "brand": "巴拉巴拉", "suggestion": "内搭+针织+防风外套" },
    "food": {
      "breakfast": "南瓜小米粥+蒸蛋",
      "lunch": "番茄牛肉面+西兰花",
      "dinner": "三文鱼粥+胡萝卜泥"
    },
    "upcomingEvents": [
      { "id": 7001, "title": "儿保复查", "eventTime": "2026-03-17 10:00:00", "daysLeft": 2 }
    ],
    "expenseSummary": { "monthTotal": 4865.00, "budget": 5500.00, "usageRate": 0.88 }
  }
}
```

## 2) 附近学校推荐
### Request
```http
GET /api/v1/recommend/schools?childId=101&stage=kindergarten_3_6&lat=39.92&lng=116.46&radius=5000&budgetMax=3000
Authorization: Bearer <token>
```

### Response
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_school_001",
  "data": {
    "total": 2,
    "items": [
      {
        "schoolId": 3001,
        "name": "京华幼儿园",
        "distanceMeter": 2100,
        "ownership": "public",
        "tuitionRange": "1500-2200/月",
        "rating": 4.6,
        "features": ["双语", "艺术课程"],
        "policyUpdatedAt": "2026-02-20 10:00:00",
        "sourceUrl": "https://example.edu.cn"
      }
    ]
  }
}
```

## 3) 新增提醒事件
### Request
```http
POST /api/v1/schedule/events
Authorization: Bearer <token>
Content-Type: application/json
```

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

### Response
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_schedule_001",
  "data": {
    "eventId": 7001,
    "reminderJobs": 4,
    "status": "pending"
  }
}
```

## 4) 记一笔花销
### Request
```http
POST /api/v1/expenses
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "childId": 101,
  "amount": 89,
  "category": "diaper",
  "paidAt": "2026-03-15 11:08:00",
  "note": "尿不湿L码"
}
```

### Response
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_expense_001",
  "data": {
    "expenseId": 9901,
    "monthTotal": 4954.00,
    "budgetUsageRate": 0.90,
    "warning": "预算已使用90%"
  }
}
```

## 5) 语音意图解析
### Request
```http
POST /api/v1/voice/parse
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "sessionId": "voice_abc_001",
  "text": "这个月到目前花了多少钱"
}
```

### Response
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_voice_parse_001",
  "data": {
    "intent": "query_expense_total",
    "confidence": 0.96,
    "slots": { "range": "month_to_date" },
    "needConfirm": false
  }
}
```

## 6) 语音指令执行
### Request
```http
POST /api/v1/voice/execute
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "sessionId": "voice_abc_001",
  "intent": "query_expense_total",
  "slots": { "range": "month_to_date" }
}
```

### Response
```json
{
  "code": 0,
  "message": "ok",
  "requestId": "req_voice_exec_001",
  "data": {
    "text": "这个月到目前总花销是4865元。",
    "tts": "这个月到目前总花销是4865元",
    "action": {
      "type": "open_page",
      "target": "expense_report"
    }
  }
}
```
