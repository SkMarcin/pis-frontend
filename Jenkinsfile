pipeline {
    agent any
    environment {
            DOCKER_IMAGE = "frontend"
            DOCKER_TAG = "${env.BUILD_NUMBER}"
            NEXUS_VERSION = "nexus3"
            NEXUS_PROTOCOL = "http"
            NEXUS_URL = "127.0.0.1:8081"
            NEXUS_REPOSITORY = "system-biblioteczny-maven-nexus-repo"
            NEXUS_CREDENTIAL_ID = "nexus-user-credentials"
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
            when {
                expression {
                    env.GIT_BRANCH == 'origin/main'
                }
            }
            steps {
                dir('pis-frontend') {
                    script {
                        sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."

                        sh "docker rm -f frontend || true"

                        sh "docker run -d --name frontend -p 3001:3001 ${DOCKER_IMAGE}:${DOCKER_TAG}"

                        sh "tar -czvf build.tar.gz build/"

                        nexusArtifactUploader(
                            nexusVersion: NEXUS_VERSION,
                            protocol: NEXUS_PROTOCOL,
                            nexusUrl: NEXUS_URL,
                            groupId: "com.example.frontend",
                            version: "${env.BUILD_NUMBER}",
                            repository: NEXUS_REPOSITORY,
                            credentialsId: NEXUS_CREDENTIAL_ID,
                            artifacts: [
                                [artifactId: "frontend-build",
                                 classifier: '',
                                 file: "build.tar.gz",
                                 type: "tar.gz"]
                            ]
                        )
                    }
                }
            }
        }
    }
}