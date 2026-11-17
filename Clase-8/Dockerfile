FROM node:24.18-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY src ./src
ENV NODE_ENV=production
ENV LOG_LEVEL=warning
EXPOSE 8080
CMD ["npm","start"]
