pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'sudo apt install nodejs npm'
                sh 'npm install'
            }
        }
    }
}