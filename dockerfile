FROM node:20.11.0

ENV NODE_ENV=production

WORKDIR /src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run swagger

EXPOSE 3000

CMD ["node", "dist/app.js"]