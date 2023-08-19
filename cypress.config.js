const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://naveenautomationlabs.com/opencart/index.php?route=account/login',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
