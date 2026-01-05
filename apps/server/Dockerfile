# 1. 빌드 단계
FROM node:20-alpine AS builder
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 프로젝트 전체 복사 (워크스페이스 인식용)
COPY . .

# 의존성 설치 (pnpm-lock.yaml을 참조하여 설치)
RUN pnpm install --frozen-lockfile

# 빌드 실행
RUN pnpm run build --filter server

# 2. 실행 단계
FROM node:20-alpine
WORKDIR /app

# 빌드 결과물과 실행에 필요한 파일들만 복사
# pnpm은 node_modules 구조가 다르므로 전체를 복사하거나 
# 빌드된 dist와 필요한 prod 의존성만 추려야 합니다. 
# 일단 성공을 위해 아래와 같이 설정합니다.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package*.json ./

EXPOSE 3000
CMD ["node", "dist/main"]