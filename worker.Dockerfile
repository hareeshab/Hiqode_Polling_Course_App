FROM node:20-alpine
WORKDIR /app
COPY worker/package.json ./
RUN npm install
RUN npm ci --omit=dev
COPY worker/src ./src
CMD ["npm","start"]
