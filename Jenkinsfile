pipeline {
    agent any
    stages {
        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm start'
            }
        }
    }
    post {
        always {
            sh 'pkill -f "node"' // Ensure any background servers are terminated
        }
    }
}