# 1. Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY apps/client/package*.json ./apps/client/
RUN npm install
COPY . .
# Vite/CRA 빌드 (결과물은 보통 apps/web/dist에 생김)
RUN npm run build --workspace=client

# 2. Run Stage (Nginx)
FROM nginx:alpine
# React 빌드 결과물을 Nginx의 정적 파일 경로로 복사
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html
# Nginx 설정 파일 (필요시) 복사
# COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
