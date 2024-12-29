pipeline {
    agent any
    environment {
            DOCKER_IMAGE = "frontend"
            DOCKER_TAG = "${env.BUILD_NUMBER}"
        }
    stages {
        stage('Dependencies') {
            steps {
                dir('pis-frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('pis-frontend') {
                    sh 'npm run build'
                }
            }
        }
        stage('Docker Build and Deploy') {
            steps {
                dir('pis-frontend') {
                    script {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."

                        sh "docker rm -f frontend || true"

                        sh "docker run -d --name frontend -p 3001:3001 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }
    }
}