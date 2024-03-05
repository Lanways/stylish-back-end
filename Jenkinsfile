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
              sh 'docker run -it -d -p 3000:3000 --env-file /var/jenkins_home/.env --name stylishContainer --network stylish_network stylish:v1 /bin/sh'
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
        stage('Check for Changes') {
          when {
            branch 'master'
          }
          steps {
            script {
                def Changes = sh(script:"git diff --name-only ${env.GIT_PREVIOUS_COMMIT} ${env.GIT_COMMIT}",returnStdout: true).trim()
                if (Changes) {
                  env.HAS_CHANGES = 'true'
                } else {
                  env.HAS_CHANGES = 'false'
                }
                echo "Checked for changes: ${env.HAS_CHANGES}"
            }
          }
        }
        stage('Deploy to AWS') {
          when {
            allOf {
              branch 'master'
              expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
              expression { env.HAS_CHANGES == 'true' }
            }
          }
          steps {
            script {
              sh 'aws deploy create-deployment --application-name Stylish --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name Stylish_Group --github-location repository=Lanways/stylish-back-end,commitId=${GIT_COMMIT}'
            }
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