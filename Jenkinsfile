pipeline {
    agent any

    tools {
        nodejs 'A408_FE_Build'
    }

    stages {
        stage('Build FE') {
            steps {
                script {
                    // FE 폴더로 이동
                    dir('FE') {
                        sh 'node -v'
                        sh 'npm -v'
                        sh 'rm -rf node_modules'
                        // sh 'rm package-lock.json'
                        sh 'npm install'
			            sh 'npm install --global yarn'
                        sh 'yarn install'
                        sh 'yarn build'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
