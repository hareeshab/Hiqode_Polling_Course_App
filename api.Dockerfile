FROM node:20-alpine
WORKDIR /app
COPY api/package.json ./
RUN npm install
RUN npm ci --omit=dev
COPY api/src ./src
ENV PORT=8080
EXPOSE 8080
CMD ["npm","start"]
