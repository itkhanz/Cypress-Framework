pipeline {
   
   //The agent section specifies where the entire Pipeline, or a specific stage, 
   //will execute in the Jenkins environment depending on where the agent section is placed.
   agent any
   
   //The environment directive specifies a sequence of key-value pairs which will be defined
   //as environment variables for all steps, or stage-specific steps, depending on where the environment directive is located within the Pipeline.
   /*environment {
        NO_COLOR = '1'
    }*/

    //NoAnsi Color Plugin helps to avoid weird Jenkins console output and displays the console output in color format
    options {
        ansiColor('xterm')
    }
   
   tools {
       //Use Node name configured in global tools configuration for Node Jenkins Plugin
       nodejs "Node 20.5.0"
   }
   

   //The parameters directive provides a list of parameters that a user should provide when triggering the Pipeline.
   //The values for these user-specified parameters are made available to Pipeline steps via the params object
   parameters {
        string(
            name: 'TEST_SPEC', 
            defaultValue: 'cypress/e2e/tests/*.cy.js', 
            description: 'Enter the name of the test spec without file extension e.g. LoginTest. Default value will run all the test specs present inside cypress/e2e/tests/ directory.'
        )
        string(
            name: 'RECORD_TESTS', 
            defaultValue: '--record false', 
            description: 'Within CI, you can pass --record argument to record the test runs to later view on cypress dashboard. Remove the false to record the tests.'
        )
        choice(
            name: 'TEST_ENVIRONMENT', 
            choices: [
                'local',
                'dev',
                'qa',
                'stage',
                'prod',
            ], 
            description: 'Specify the test environment. Default will be local.'
        )
        choice(
            name: 'BROWSER', 
            choices: ['electron', 'chrome', 'edge', 'firefox'], 
            description: 'Pick the web browser you want to use to run your scripts. Default will be electron.'
        )
        choice(
            name: 'BROWSER_MODE', 
            choices: ['headless', 'headed'], 
            description: 'By default, Cypress will run tests headlessly.Passing --headed will force the browser to be shown.'
        )
        choice(
            name: 'TAG', 
            choices: [
                '@regression', 
                '@smoke', 
                '@Login', 
                '@productData', 
                '@Search', 
                '@Wishlist', 
                '@Cart'
            ], 
            description: 'Choose the test tag to filter your test scripts'
        )
    }



    //The stage directive goes in the stages section and should contain a steps section, an optional agent section, 
    //or other stage-specific directives. Practically speaking, all of the real work done by a Pipeline will be wrapped in one or more stage directives.
   stages {
       stage('Stage 1 - Checkout Code') {
        //The steps section defines a series of one or more steps to be executed in a given stage directive.
            steps {
                // Get some code from a GitHub repository
                /* git ([
                        branch: 'main',
                        changelog: true,
                        credentialsId: 'itkhanz',
                        poll: false,
                        url: 'https://github.com/itkhanz/Cypress-Framework'
                ]) */

                echo 'Code is checked out'
            }
        }
        
       stage('Stage 2 - Installing dependencies') {
           steps {
               bat 'npm i'
               echo 'dependencies installed'
           }
       }
       
       //This deletes any older xml results files present in the directory
       stage('Stage 3 - Clearing old reports') {
           steps {
               bat "npm run report:pre"
           }
       }
       
       stage('Stage 4 - Running cypress e2e Tests') {
            //For recording tests on Cypress Cloud Dashboard, you need to set these environment variables
            environment {
                CYPRESS_RECORD_KEY = credentials('cypress-framework-record-key')
                CYPRESS_PROJECT_ID = credentials('cypress-framework-project-id')
            }

            steps {
                //bat "SET NO_COLOR=$NO_COLOR"    //You may want to do this if ASCII characters or colors are not properly formatted in your CI.
                script {
                    if (params.TEST_SPEC == "cypress/e2e/tests/*.cy.js") {
                        echo "Running all test scripts with Browser: ${params.BROWSER}, TAG: ${params.TAG}, Environment: ${params.TEST_ENVIRONMENT}"
                        bat "npx cypress run --${params.BROWSER_MODE} --browser ${params.BROWSER} --env environmentName=${params.TEST_ENVIRONMENT},grepTags=${params.TAG} ${params.RECORD_TESTS}"
                    } else {
                        echo "Running script: ${params.TEST_SPEC} with Browser: ${params.BROWSER}, TAG: ${params.TAG}, Environment: ${params.TEST_ENVIRONMENT}"
                        bat "npx cypress run --spec cypress/e2e/tests/${params.TEST_SPEC}.cy.js --${params.BROWSER_MODE} --browser ${params.BROWSER} --env environmentName=${params.TEST_ENVIRONMENT},grepTags=${params.TAG} ${params.RECORD_TESTS}"
                    }
                }
                
            }
        }
        
        //Mocha JUnit Reporter produces separate XML for each spec result, so we merge the test results into one XML file 
       stage('Stage 5 - Merging JUnit reports') {
           steps {
               bat "npm run report:post"
           }
       }

   }
   
   post {
        always {
            //Publish the HTML report using the HTML Publisher plugin
            echo 'Publishing the Extent Report'
            publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'cypress/results/cypress-mochawesome-reporter',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Mochawesome Report',
                    reportTitles: 'Cypress Test Automation Framework',
                    useWrapperFileDirectly: true
            ])
            
            //To avoid duplicate results, we comment this, and use it within script only
            //junit 'cypress/results/junit/combined-report.xml'

            script {
                // Get the JUnit test results
                echo 'Publishing JUnit XML Results'
                def testResults = junit testResults: 'cypress/results/junit/combined-report.xml'
                
                //Mapping build status to slack notification colors
                def COLOR_MAP = [
                    'SUCCESS'   : '#4CAF50',   //Green
                    'FAILURE'   : '#F44336',   //Red
                    'UNSTABLE'  : '#FFC107',   //Yellow
                    'ABORTED'   : '#9E9E9E',   //Grey
                    'NOT_BUILT' : '#2196F3',   //Blue
                    'UNKNOWN'   : '#CCCCCC'    //Light Gray
                ]
                
                echo 'Sending Slack Notification'
                slackSend channel: '#cypress-framework-jenkins',
                          color: COLOR_MAP[currentBuild.currentResult],
                          message: "*${currentBuild.currentResult}*\n *Job*: ${env.JOB_NAME} , *Build*: ${env.BUILD_NUMBER}\n *Test Results*: \n\t Total: ${testResults.totalCount} Passed: ${testResults.passCount} Failed: ${testResults.failCount} Skipped: ${testResults.skipCount}\n *Test Run Configuration*:\n\t *Test Script(s)*: ${params.TEST_SPEC}\n\t *Browser*: ${params.BROWSER}  ${params.BROWSER_MODE}\n\t *Tags*: ${params.TAG}\n\t *Environment*: ${params.TEST_ENVIRONMENT}\n\t *Dashboard Recording*: ${params.RECORD_TESTS}\n *Test Report*: ${env.BUILD_URL}Cypress_20Mochawesome_20Report/ \n *More info*: ${env.BUILD_URL}"
     
            }
        }
        
        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }

        unstable {
            echo 'Build unstable'
        }
    }
}