FROM node:18-alpine

# Install required dependencies
RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY package*.json ./

# Install dependencies first
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
