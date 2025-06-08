FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

RUN chown -R nodejs:nodejs /app
RUN chown -R 755 /app

USER nodejs
EXPOSE 8080

CMD ["npm", "run", "start"]
