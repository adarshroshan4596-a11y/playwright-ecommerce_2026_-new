pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Pulls your code from GitHub
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                // Builds the Docker image we just verified locally
                sh 'docker build -t qa-new .'
            }
        }
        stage('Run Tests') {
            steps {
                // Runs the tests inside the container
                sh 'docker run qa-new'
            }
        }
    }
    post {
        always {
            echo 'Automation Cycle Finished.'
        }
    }
}