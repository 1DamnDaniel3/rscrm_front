pipeline{
    agent any
    
    environment{
        PROJECT_DIR = '/srv/developers/src/rscrm'
    }
    stages{
        stage('Deploy'){
            steps{
                dir("${PROJECT_DIR}/rscrm_front"){
                    sh 'git pull'
                }
                dir("${PROJECT_DIR}"){
                    sh 'docker compose up -d --build frontend'
                }
            }
        }
    }
}