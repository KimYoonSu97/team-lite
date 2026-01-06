# 1. 빌드 단계
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# [수정] turbo.json 파일을 반드시 포함시켜야 합니다.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY apps/client/ ./apps/client/

# 의존성 설치
RUN pnpm install --filter client... --frozen-lockfile

# 빌드 실행
RUN pnpm run build --filter client

# 2. 실행 단계 (Nginx)
FROM nginx:alpine
# Vite 빌드 결과물 복사
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
