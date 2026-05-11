pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t qa-new .'
            }
        }
        stage('Test') {
            steps {
                // The -v maps the folder inside Docker to your Jenkins workspace
                sh 'docker run --name test-container qa-new'
            }
        }
        stage('Extract Report') {
            steps {
                // Copy the report folder from the container to Jenkins
                sh 'docker cp test-container:/app/playwright-report ./playwright-report'
            }
        }
    }
    post {
        always {
            // This makes the report visible in the Jenkins UI
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            // Clean up the container so we can run it again next time
            sh 'docker rm test-container'
        }
    }
}