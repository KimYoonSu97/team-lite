# 1. 빌드 단계
FROM node:20-alpine AS builder
WORKDIR /app

# [중요] 루트와 모든 앱의 package.json을 먼저 복사하여 워크스페이스 구조를 인식시킵니다.
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
COPY apps/client/package*.json ./apps/client/

# npm 최신 버전 업데이트 및 의존성 설치
RUN npm install -g npm@latest
RUN npm install

# 전체 소스 코드 복사
COPY . .

# 빌드 실행 (워크스페이스 명령어 대신 직접 이동해서 실행하는게 가장 안전합니다)
RUN cd apps/server && npm run build

# 2. 실행 단계
FROM node:20-alpine
WORKDIR /app

# 빌드 결과물과 필요한 파일만 복사
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/package*.json ./

EXPOSE 3000
CMD ["node", "dist/main"]