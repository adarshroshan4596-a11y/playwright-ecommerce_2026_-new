pipeline {
    agent any
    
    // This part tells Jenkins where the Docker tool is
    environment {
        DOCKER_HOME = '/usr/bin/docker'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                // We use 'sudo' or direct path if 127 persists
                sh 'docker build -t qa-new .'
            }
        }
        stage('Run Tests') {
            steps {
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