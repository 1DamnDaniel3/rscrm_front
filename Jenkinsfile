pipeline {
    agent any
    environment {
        PROJECT_DIR = '/srv/developers/src/rscrm'
    }
    stages {
        stage('Deploy') {
            steps {
                dir("${env.WORKSPACE}") {
                    sh """
                    cd ${PROJECT_DIR}/rscrm_front
                    git reset --hard
                    git clean -fd
                    git pull
                    cd ${PROJECT_DIR}
                    docker compose up -d --build frontend
                    """
                }
            }
        }
    }
}
