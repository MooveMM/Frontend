
pipeline{
  agent any
    environment{
      //ENV sdfsdf
        APPURL = 'api/v1/template'
        GIT_REPO_SSH="git@github.com:MooveMM/Router.git"

    }

    stages {
      stage('Initialize'){
        steps{
               sh 'docker -v'
               sh 'whoami'
        }
          }

       stage ('build react app'){
           steps{
           
             sh 'sudo chown -R   /home/jenkins/.npm/ '
            sh 'npm install'
            sh 'npm run-script build'
           }
        }


          stage('Building image') {
             steps {
                   script {
                    docker.withRegistry("http://docker.moove-86bb64229c8b7986aa79497eaebc2fd2-0000.eu-gb.containers.appdomain.cloud/repository/docker/", 'registrylogin' ) {
                        sh "docker build -t  docker.moove-86bb64229c8b7986aa79497eaebc2fd2-0000.eu-gb.containers.appdomain.cloud/docker/frontend:latest ."
                      } 
                   }
             }
          }

        stage('push image') {
               steps{
                    script {
             docker.withRegistry("http://docker.moove-86bb64229c8b7986aa79497eaebc2fd2-0000.eu-gb.containers.appdomain.cloud/repository/docker/", 'registrylogin' ) {
                sh "docker push docker.moove-86bb64229c8b7986aa79497eaebc2fd2-0000.eu-gb.containers.appdomain.cloud/docker/frontend:latest"
              }
                    }
               }
              
          }

        stage('redeploy to kubernetes') {
              //deploy/redeploy appsf asdf
                steps{
             sh 'kubectl replace --force -f ./deploy/deployment.yaml -n dev'
             sh 'kubectl replace --force -f ./deploy/service.yaml -n dev'
                }
            }
          }


    }      
          
//