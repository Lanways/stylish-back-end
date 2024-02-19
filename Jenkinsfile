pipeline {
    agent any
    
    stages {

        stage('Build Docker Network') {
          steps {
            script {
              sh 'docker network create stylish_network'
              sh 'docker network ls | grep stylish_network'
            }
          }
        }
        stage('Start Postgres Container') {
            steps {
                script {
                    sh 'docker run -d -p 5432:5432 --name postgres --network stylish_network -e POSTGRES_PASSWORD=password postgres:latest'
                    sh 'sleep 5'
                    sh 'docker exec -i postgres psql -U postgres -c "CREATE DATABASE stylish_test;"'
                    sh 'docker ps | grep postgres'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
              script {
                  sh 'docker build -t stylish:v1 .'
                  sh 'docker images | grep postgres'
              }
            }
        }
        stage('Start App Container And Db Migrate') {
          steps {
            script {
              sh 'docker run -it -d -p 3000:3000 -e NODE_ENV=test -e DB_USER=postgres -e DB_PASS=password -e DB_NAME_TEST=stylish_test -e DB_HOST=postgres -e JWT_SECRET=lan --name stylishContainer --network stylish_network stylish:v1 /bin/sh'
              sh 'docker ps | grep stylishContainer'
              sh 'docker exec stylishContainer npx sequelize db:migrate'
            }
          }
        }
        stage('Start Test') {
            steps {
                sh 'docker exec stylishContainer npm run test'
            }
        }
    }
    
    post {
        always {
            script {
                sh 'docker stop postgres || true'
                sh 'docker rm postgres || true'
                sh 'docker stop stylishContainer || true'
                sh 'docker rm stylishContainer || true'
                sh 'docker rmi stylish:v1 || true'
                sh 'docker network rm stylish_network'
                sh 'docker image prune -f || true'
                sh 'docker volume prune -f || true'
            }
        }
    }
}