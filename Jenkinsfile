pipeline {
    agent any
    stages {
        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build and Smoke Test') {
            steps {
                script {}
                    sh 'npm start &'
                    sleep 20

                    def retries = 5
                    while (retries > 0) {
                        try {
                            sh 'curl -f http://localhost:3000'
                            break
                        } catch (Exception e) {
                            retries--
                            sleep 5
                            if (retries == 0) {
                                error "Server did not start in time"
                            }
                        }
                    }
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