#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3000}"

assert_ok() {
  local name="$1"
  local body="$2"
  if [[ "$body" != *'"code":0'* ]]; then
    echo "[FAIL] $name"
    echo "$body"
    exit 1
  fi
  echo "[PASS] $name"
}

assert_http_400() {
  local name="$1"
  local response="$2"
  local status="${response##*HTTP_STATUS:}"
  if [[ "$status" != "400" ]]; then
    echo "[FAIL] $name expected 400 got $status"
    echo "$response"
    exit 1
  fi
  echo "[PASS] $name"
}

echo "[info] BASE_URL=$BASE_URL"

dashboard=$(curl -sS "$BASE_URL/api/v1/dashboard/today?childId=101&city=beijing")
assert_ok "dashboard today" "$dashboard"

feeding=$(curl -sS "$BASE_URL/api/v1/feeding/recommendations?childId=101&date=2026-03-15&allergens=%E8%8A%B1%E7%94%9F")
assert_ok "feeding recommendations" "$feeding"

outfit=$(curl -sS "$BASE_URL/api/v1/outfit/recommendations?childId=101&temperature=8&rainProbability=65")
assert_ok "outfit recommendations" "$outfit"

nearby_places=$(curl -sS "$BASE_URL/api/v1/nearby/places?city=beijing&lat=39.92&lng=116.46&weather=rainy&aqi=40")
assert_ok "nearby places" "$nearby_places"

nearby_schools=$(curl -sS "$BASE_URL/api/v1/nearby/schools?city=beijing&stage=kindergarten_3_6&budget=2000-5000")
assert_ok "nearby schools" "$nearby_schools"

recommend_places=$(curl -sS "$BASE_URL/api/v1/recommend/places?city=beijing&weather=sunny&aqi=50&budget=2000-5000&stage=kindergarten_3_6")
assert_ok "recommend places compat" "$recommend_places"

recommend_schools=$(curl -sS "$BASE_URL/api/v1/recommend/schools?city=beijing&stage=kindergarten_3_6&weather=sunny&aqi=50&budget=2000-5000")
assert_ok "recommend schools compat" "$recommend_schools"

schedule_list=$(curl -sS "$BASE_URL/api/v1/schedule/events?status=pending")
assert_ok "schedule list pending" "$schedule_list"

schedule_create=$(curl -sS -X POST "$BASE_URL/api/v1/schedule/events" \
  -H "Content-Type: application/json" \
  -d '{"childId":101,"eventType":"checkup","title":"儿保复查","eventTime":"2026-03-20 10:00:00","location":"朝阳妇幼保健院","note":"携带疫苗本","remindOffsets":[10080,4320,1440,0]}')
assert_ok "schedule create" "$schedule_create"
event_id=$(node -e "const d=JSON.parse(process.argv[1]); console.log(d.data?.eventId ?? '');" "$schedule_create")
if [[ -z "$event_id" ]]; then
  echo "[FAIL] parse schedule eventId"
  echo "$schedule_create"
  exit 1
fi

schedule_patch=$(curl -sS -X PATCH "$BASE_URL/api/v1/schedule/events/$event_id/status" \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}')
assert_ok "schedule patch status" "$schedule_patch"

health_record=$(curl -sS -X POST "$BASE_URL/api/v1/health/record" \
  -H "Content-Type: application/json" \
  -d '{"childId":101,"recordTime":"2026-03-16 08:30:00","weightKg":13.5,"heightCm":90.3,"temperatureC":37.2,"sleepHours":10.4,"note":"状态良好"}')
assert_ok "health record" "$health_record"

health_summary=$(curl -sS "$BASE_URL/api/v1/health/summary?childId=101")
assert_ok "health summary" "$health_summary"

expense_create=$(curl -sS -X POST "$BASE_URL/api/v1/expenses" \
  -H "Content-Type: application/json" \
  -d '{"childId":101,"amount":89,"category":"diaper","paidAt":"2026-03-15 11:08:00","note":"尿不湿L码"}')
assert_ok "expense create" "$expense_create"

expense_summary=$(curl -sS "$BASE_URL/api/v1/expenses/summary?range=month")
assert_ok "expense summary" "$expense_summary"

voice_parse=$(curl -sS -X POST "$BASE_URL/api/v1/voice/parse" \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"voice_abc_001","text":"这个月到目前花了多少钱"}')
assert_ok "voice parse" "$voice_parse"

voice_execute=$(curl -sS -X POST "$BASE_URL/api/v1/voice/execute" \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"voice_abc_001","intent":"query_expense_total","slots":{"range":"month_to_date"}}')
assert_ok "voice execute" "$voice_execute"

invalid_expense=$(curl -sS -X POST "$BASE_URL/api/v1/expenses" \
  -H "Content-Type: application/json" \
  -d '{"childId":101,"amount":0,"category":"diaper","paidAt":"2026-03-15 11:08:00"}' \
  -w "HTTP_STATUS:%{http_code}")
assert_http_400 "expense invalid amount" "$invalid_expense"

invalid_schedule=$(curl -sS "$BASE_URL/api/v1/schedule/events?status=wrong" -w "HTTP_STATUS:%{http_code}")
assert_http_400 "schedule invalid status" "$invalid_schedule"

echo "[done] full api test passed."
