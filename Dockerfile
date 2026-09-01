FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN mkdir -p logs uploads/users uploads/receipts

EXPOSE 8080

CMD ["npm", "start"]