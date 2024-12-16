pipeline {
    agent any
    stages {
        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage(' Build and Smoke Test') {
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