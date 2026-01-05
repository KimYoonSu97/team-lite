# 1. 빌드 단계 (Build Stage)
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 프로젝트 전체 복사 (워크스페이스 의존성 해결을 위해 전체가 필요함)
COPY . .

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 클라이언트 빌드 실행 (앱 이름이 'client'인지 확인하세요)
RUN pnpm run build --filter client

# 2. 실행 단계 (Run Stage - Nginx)
FROM nginx:alpine

# 빌드 결과물을 Nginx의 정적 파일 저장소로 복사
# 보통 Vite 빌드 결과물은 apps/client/dist 에 생깁니다.
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# 80번 포트 개방
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]