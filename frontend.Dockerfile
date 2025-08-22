FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package.json ./
RUN npm install
RUN npm ci --omit=dev
COPY frontend .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Proxy /api to api service when using docker compose network
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
