#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3000}"

pretty_print() {
  if command -v jq >/dev/null 2>&1; then
    jq .
  else
    cat
  fi
}

echo "[smoke] BASE_URL=$BASE_URL"

echo "\n[1/6] dashboard/today"
curl -sS "$BASE_URL/api/v1/dashboard/today?childId=101&city=beijing" | pretty_print

echo "\n[2/6] expenses (POST)"
curl -sS -X POST "$BASE_URL/api/v1/expenses" \
  -H 'Content-Type: application/json' \
  -d '{"childId":101,"amount":89,"category":"diaper","paidAt":"2026-03-15 11:08:00","note":"尿不湿L码"}' | pretty_print

echo "\n[3/6] expenses/summary"
curl -sS "$BASE_URL/api/v1/expenses/summary?range=month" | pretty_print

echo "\n[4/8] recommend/places"
curl -sS "$BASE_URL/api/v1/recommend/places?city=beijing" | pretty_print

echo "\n[5/8] recommend/schools"
curl -sS "$BASE_URL/api/v1/recommend/schools?city=beijing&stage=kindergarten_3_6" | pretty_print

echo "\n[6/8] health/summary"
curl -sS "$BASE_URL/api/v1/health/summary?childId=101" | pretty_print

echo "\n[7/8] schedule/events (POST)"
curl -sS -X POST "$BASE_URL/api/v1/schedule/events" \
  -H 'Content-Type: application/json' \
  -d '{"childId":101,"eventType":"checkup","title":"儿保复查","eventTime":"2026-03-17 10:00:00","location":"朝阳妇幼保健院","note":"携带疫苗本","remindOffsets":[10080,4320,1440,0]}' | pretty_print

echo "\n[8/8] voice/parse (POST)"
curl -sS -X POST "$BASE_URL/api/v1/voice/parse" \
  -H 'Content-Type: application/json' \
  -d '{"sessionId":"voice_abc_001","text":"这个月到目前花了多少钱"}' | pretty_print

echo "\n[extra] voice/execute (POST)"
curl -sS -X POST "$BASE_URL/api/v1/voice/execute" \
  -H 'Content-Type: application/json' \
  -d '{"sessionId":"voice_abc_001","intent":"query_expense_total","slots":{"range":"month_to_date"}}' | pretty_print

echo "\n[done] 所有接口已请求完成。"
