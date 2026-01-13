FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist/app ./dist/app
EXPOSE 4200
CMD ["http-server", "dist/app", "--port", "4200", "--host", "0.0.0.0"]
