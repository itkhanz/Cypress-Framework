/***********************************************************************************
 * This file is used to store any configuration specific to Cypress.
 * https://docs.cypress.io/guides/references/configuration
 * 
 * Cypress gives you the option to dynamically alter configuration options. 
 * This is helpful when running Cypress in multiple environments and on multiple developer machines.
 * https://docs.cypress.io/guides/references/configuration#Overriding-Options
 * 
 * Overriding Individual Options
 * When running Cypress from the command line you can pass a --config flag to override individual config options.
 * 
 * Specifying an Alternative Config File
 * In the Cypress CLI, you can change which config file Cypress will use with the --config-file flag.
 * 
 * https://docs.cypress.io/guides/guides/environment-variables
 * https://docs.cypress.io/api/cypress-api/env
 * Configuration options can be overridden with environment variables. 
 * export CYPRESS_VIEWPORT_WIDTH=800
 * This is especially useful in Continuous Integration or when working locally. 
 * This gives you the ability to change configuration options without modifying any code or build scripts.
 * 
 * https://docs.cypress.io/guides/references/configuration#Test-Configuration
 * Cypress provides two options to override the configuration while your test are running, 
 * Cypress.config() and suite-specific or test-specific configuration overrides.
 * 
 * Cypress.config()
 * https://docs.cypress.io/api/cypress-api/config
 * You can also override configuration values within your test using Cypress.config().
 * 
 * Test-specific Configuration
 * To apply specific Cypress configuration values to a suite or test, 
 * pass a configuration object to the test or suite function as the second argument.
 * 
 ***********************************************************************************/

const { defineConfig } = require("cypress");

module.exports = defineConfig({

  //Cypress uses your projectId and Record Key together to uniquely identify projects.
  //projectId: '',

  trashAssetsBeforeRuns : true,   //Whether Cypress will trash assets within the downloadsFolder, screenshotsFolder, and videosFolder before tests run with cypress run.
  
  //Folders/ Files
  downloadsFolder   : 'cypress/downloads',
  fixturesFolder    : 'cypress/fixtures',

  //Screenshots
  screenshotsFolder       : 'cypress/screenshots',
  screenshotOnRunFailure  : true,  //Whether Cypress will take a screenshot when a test fails during cypress run.

  //Videos
  video             : true,            //Whether Cypress will capture a video of the tests run with cypress run.
  videosFolder      : 'cypress/videos',
  videoCompression  : false,            //The quality setting for the video compression, in Constant Rate Factor (CRF). 

  //Viewport  (Override with cy.viewport() command)
  viewportHeight  : 800,   //Default height in pixels for the application under tests' viewport. 
  viewportWidth   : 1200,  //Default width in pixels for the application under tests' viewport.

  //Timeouts
  defaultCommandTimeout : 5000, //Time, in milliseconds, to wait until most DOM based commands are considered timed out.


  //reports configuration
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },

  //The number of times to retry a failing test. Can be configured to apply to cypress run or cypress open separately.
  //If you want to configure retry attempts on a specific test or suite, you can set this by using the test's/suite's configuration.
  retries : {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 1,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode : 1
  },


  //configuration options for e2e configuration object
  e2e: {

    //URL used as prefix for cy.visit() or cy.request() command's URL.
    //baseUrl: 'https://naveenautomationlabs.com/opencart/index.php',

    //A String or Array of glob patterns of the test files to load.
    specPattern	: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    //Path to file to load before spec files load. This file is compiled and bundled.
    supportFile : 'cypress/support/e2e.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // implement node event listeners here

      //Load the testing configuration and environment variables from separate JSON files.
      //we put the baseUrl and envionment specific config settings in settings/env.settings.json
      const environmentName = config.env.environmentName || 'local';
      const environmentFilename = `./settings/${environmentName}.settings.json`;
      console.log('loading %s', environmentFilename);
      const settings = require(environmentFilename);

      //overwriting the baseUrl from settings file to config
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl
      }

      // Megring the configuration settings. 
      // If there are properties with the same name in both objects, the ones from settings.env will overwrite those in config.env.
      // If there are unique properties in either object, they will also be included in the merged config.env.
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        }
      }
      console.log('loaded settings for environment %s', environmentName);

      //we save the projectId as env variable in cypress.env.json that is loaded automatically by cypress
      if(config.env.projectId) {
        config.projectId = config.env.projectId;
      }

      //cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);  

      //cypress grep plugin config for tags
      require('@cypress/grep/src/plugin')(config);

      //It is very important to return the updated config object to the caller, so Cypress knows to use the changes configuration.
      return config;
    },
    
    //Any key/value you set in your Cypress configuration under the env key will become an environment variable.
    //When your tests are running, you can use the Cypress.env function to access the values of your environment variables.
    env : {
      URL : 'https://naveenautomationlabs.com/opencart/index.php'
    }

  },
});
