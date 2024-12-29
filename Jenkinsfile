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
                script {
                    // Build Docker image
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."

                    // Stop and remove old container
                    sh "docker rm -f frontend || true"

                    // Run new container
                    sh "docker run -d --name frontend -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
}