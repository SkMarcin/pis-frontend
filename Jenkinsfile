pipeline {
    agent any
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
    }
}