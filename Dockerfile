FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


FROM node:24-alpine AS production

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY package*.json ./

COPY src ./src

RUN mkdir -p logs uploads/users uploads/receipts

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "start"]