const { defineConfig } = require("cypress");

module.exports = defineConfig({

  //cypress-mochawesome-reporter
  reporter: 'cypress-mochawesome-reporter',  
  reporterOptions: {
    charts: true, //Genarates Chart in HTML report
    reportPageTitle: 'OpenCart Test Report', //Report title will be set to the mentioned string
    embeddedScreenshots: true, //Screenshot will be embedded within the report
    inlineAssets: true, //No separate assets folder will be created
    videoOnFailOnly: false, //If Videos are recorded and added to the report, setting this to true will add the videos only to tests with failures.
  },

  e2e: {
    baseUrl: 'https://naveenautomationlabs.com/opencart/index.php',

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);  //cypress-mochawesome-reporter
    },
    
    env : {
      URL : 'https://naveenautomationlabs.com/opencart/index.php'
    }
  },
});
