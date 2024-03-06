# Stylish API Server
![](https://img.shields.io/badge/TypeScript-blue)
![](https://img.shields.io/badge/Express-grey)
![](https://img.shields.io/badge/Sequelize-yellow)
![](https://img.shields.io/badge/Postgres-blue)
![](https://img.shields.io/badge/Jenkins-red)
![](https://img.shields.io/badge/Docker-blue)
![](https://img.shields.io/badge/Swagger-green)
![](https://img.shields.io/badge/AWS%20CodeDeploy-blue)
![](https://img.shields.io/badge/AWS%20EC2-yellow)

TypeScript + Express打造擁有MVC架構的API Server
並透過Jenkins、GitHub WebHook及AWS CodeDeploy來達成CI/CD Pipeline。
* [Live Demo of Stylish](https://stylish-test.netlify.app/)
![](https://i.imgur.com/DTOPG9E.png)
## 測試帳號
| Account   | Password |
|:---------:|:--------:|
| root@gmail.com   | 12345678    |
| user1@gmail.com  | 12345678    |
| user2@gmail.com  | 12345678    |
| user3@gmail.com  | 12345678    |
## 使用 Docker Compose 快速啟動專案
首先，請確保您的機器已經安裝了 Docker和 Docker Compose。如果尚未安裝，可以參照以下官方文件進行安裝：
* [Docker installation guide](https://docs.docker.com/get-docker/)
* [Docker Compose installation guide](https://docs.docker.com/compose/install/)
1. 啟動您的終端機或命令提示字元，然後將此專案克隆到您的電腦上：
```
git clone https://github.com/Lanways/stylish-back-end.git
```
2. 依照[.env.example](https://github.com/Lanways/stylish/blob/master/.env.example)環境變數建立.env檔案。
```
touch .env
```
3. 啟動 Docker Compose，
進入到專案的根目錄，並使用以下命令啟動專案：
```
docker-compose up -d
```
* 此命令將啟動並運行所有的服務。預設情況下，您的應用會在 http://localhost:3000 上運行。

4. 查看運行中的容器
```
docker ps
```
5. 進入postgres容器
```
docker exec -it <your_container_name> psql -U postgres
```
6. 建立資料庫
```
CREATE DATABASE stylish;
```
看到返回CREATE DATABASE代表建立成功，使用Ctrl + D 或輸入以下指令退出CLI
```
exit
```
7. 進入應用容器
```
docker exec -it <your_container_name> sh
```
8. 執行遷移
```
npx sequelize db:migrate
```
9. 建立種子
```
npx sequelize db:seed:all
```
10. 資料庫已經有完整的種子資料，可以訪問[SWAGGER](http://localhost:3000/api-docs)或使用[API測試工具](https://www.postman.com/)開始測試。

10. 停止 Docker Compose
想要停止專案時，只需在專案的根目執行：
```
docker-compose down
```
## 測試
1. 建立測試資料庫
```
CREATE DATABASE stylish_test;
```
2. 更改測試環境
```
export NODE_ENV=test
```
3. 建立遷移、種子
```
npx sequelize db:migrate
npx sequelize db:seed:all
```
4. 執行測試
```
npm run test
```
5. 檢視測試覆蓋率
```
npm run coverage
```
## CI/CD
![](https://i.imgur.com/J3zo29Y.png)
* 注意事項
  * Jinkins建立Item步驟中需要加入Credentials，GitHub才能取得Status來設置checks to pass before merging
  * 透過Docker啟動Jenkins會使用到Dood需掛載套接字
  * Jenkins的EC2 IAM Role需要有AWSCodeDeploy Policy
  * 需要為Secrets Manager建立Custom Policy
  * 應用的EC2需安裝CodeDeploy Agent IAM Role需要有AWSCodeDeploy、Custom Policy

## 路由列表

請參考API文件說明以獲得詳細的路由清單、必要參數和回傳格式。
* [SWAGGER](http://localhost:3000/api-docs)

建議使用API測試工具進行測試。

* [Postman](https://www.postman.com/)

也可以在瀏覽器網址列輸入 http://localhost:3000/api/ 接著加上想要測試的路由，例如：
```
http://localhost:3000/api/signin
```

## 開發工具
* bcryptjs 2.4.3
* chai 4.3.10
* cookie-parser 1.4.6
* cors 2.8.5
* dotenv 16.4.1
* express 4.18.2
* joi 17.11.0
* jsonwebtoken 9.0.2
* mocha 10.2.0
* mysql2 3.6.5
* nyc 15.1.0
* passport 0.7.0
* passport-google-oauth20 2.0.0
* passport-jwt 4.0.1
* passport-local 1.0.0
* pg 8.11.3
* proxyquire 2.1.3
* sequelize 6.35.1
* sequelize-cli 6.6.2
* sequelize-test-helpers 1.4.3
* sinon 17.0.1
* sinon-chai 3.7.0
* supertest 6.3.3
* swagger-autogen 2.23.7
* swagger-ui-express 5.0.0
* ts-node 10.9.1
* typescript 5.2.2
* ts-node-dev: 2.0.0