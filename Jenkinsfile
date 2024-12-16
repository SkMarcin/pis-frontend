{
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
    post {
        always {
            sh 'pkill -f "node"' // Ensure any background servers are terminated
        }
    }
}