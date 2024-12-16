pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'npm run build' // Ensures the app builds correctly
            }
        }
        stage('Smoke Test') {
            steps {
                script {
                    // Start the server in the background
                    sh 'npm start &'
                    sleep(10) // Wait for the server to start
                    // Check the server
                    sh 'curl -f http://localhost:3000 || exit 1'
                }
            }
        }
    }
    post {
        always {
            sh 'pkill -f "node"' // Ensure any background servers are terminated
        }
    }
}