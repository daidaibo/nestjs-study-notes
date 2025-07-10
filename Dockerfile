# https://hub.docker.com/
FROM node:22-alpine AS builder

WORKDIR /app

# RUN npm install pnpm -g --registry=https://registry.npmmirror.com/
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm run build
# RUN pnpm prune --production

COPY package*.json ./

RUN npm ci
# RUN npm ci --omit=dev

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./

RUN npm i -g pm2

EXPOSE 3000

CMD [ "pm2-runtime", "./main.js" ]

# docker build -t nest:test -f Dockerfile .
# docker run -d -p 80:3000 --name nest-test nest:test
