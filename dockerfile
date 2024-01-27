FROM node:14.18.1

WORKDIR /src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run swagger

EXPOSE 3000

CMD ["node", "dist/app.js"]