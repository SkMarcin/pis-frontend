pipeline {
    agent {
            docker {
                image 'node:18'
            }
        }
    stages {
        stage('Build') {
            steps {
                sh 'sudo apt install nodejs npm'
                sh 'npm install'
            }
        }
    }
}