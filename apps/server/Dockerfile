FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache openssl
RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile

# [수정] 이미 server 폴더 내부에서 실행되므로 경로에서 apps/server를 뺍니다.
RUN pnpm --filter server exec prisma generate --schema=prisma/schema.prisma

RUN pnpm run build --filter server

EXPOSE 3000

CMD ["node", "apps/server/dist/main"]
