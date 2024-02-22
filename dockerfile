FROM node:20.11.0-alpine

WORKDIR /src/app

COPY package.json package-lock.json ./
RUN npm install -g npm@latest && npm install --production

COPY . .
RUN npm run build
RUN npm run swagger

EXPOSE 80

CMD ["node", "dist/app.js"]