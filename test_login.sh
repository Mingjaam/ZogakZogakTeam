#!/bin/bash

echo "=== 로그인 테스트 시작 ==="

# 서버가 실행 중인지 확인
echo "서버 상태 확인 중..."
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo "✅ 서버가 실행 중입니다."
else
    echo "❌ 서버가 실행되지 않았습니다. 서버를 먼저 시작해주세요."
    exit 1
fi

# 로그인 요청 테스트
echo ""
echo "로그인 요청 테스트 중..."
response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"kimminje0627@naver.com","password":"00000000"}')

# HTTP 상태 코드와 응답 분리
http_code=$(echo "$response" | tail -n1)
response_body=$(echo "$response" | head -n -1)

echo "HTTP 상태 코드: $http_code"
echo "응답 본문: $response_body"

if [ "$http_code" = "200" ]; then
    echo "✅ 로그인 성공!"
elif [ "$http_code" = "400" ]; then
    echo "❌ 잘못된 요청 (400) - 이메일 또는 비밀번호가 잘못되었습니다."
elif [ "$http_code" = "500" ]; then
    echo "❌ 서버 내부 오류 (500) - 서버 로그를 확인해주세요."
else
    echo "❌ 예상치 못한 오류: $http_code"
fi

echo ""
echo "=== 테스트 완료 ==="
