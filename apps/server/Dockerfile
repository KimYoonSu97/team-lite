# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# 루트의 package.json들과 workspace 설정을 복사
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
# 만약 공통 패키지(libs)가 있다면 그것도 복사해야 함
# COPY libs ./libs 

RUN npm install

# 전체 소스 복사 후 빌드
COPY . .
RUN npm run build --workspace=server

# 2. Run Stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/package*.json ./

CMD ["node", "dist/main"]
