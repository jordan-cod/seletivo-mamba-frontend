FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install; 

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Não usei a public nesse app

# COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

CMD ["npm", "start"]
