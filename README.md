# Cypress Test Automation Framework

Cypress test automation framework built with JavaScript (JS) that follows the Page Object Model (POM) design pattern to implement the UI tests for OpenCart E-commerce store.

> If you are a beginner to Cypress, refer to my other repo to refresh your Cypress knowledge which will serve as a starting-point to Cypress testing:
[Cypress-E2E-Web-and-API-Testing](https://github.com/itkhanz/Cypress-E2E-Web-and-API-Testing)

Application Under Test (AUT):
https://naveenautomationlabs.com/opencart/index.php

## Features

* Atomic and Independent test cases
* Robust Locator strategies to target elements
* No hard coded strings and test data in spec files
* Hooks to perform the repeated steps for all the tests inside spec
* Loading test data from external fixtures files i.e. JSON
* Generate random test data with faker library
* Loading environment specific configuration and environment variables per environment i.e. dev, stage, prod
* Ability to filter and run tests with specific tags i.e. regression, smoke
* Pass browser and mode as environment variable
* Configure routes (URL endpoints) in a constant config file
* Usage of OOP Inheritance to extend all the pages from BasePage
  * Allows to load header and footer componentes from BasePage constructor
  * Call the `cy.visit()` from BasePage with specified path
* Test Retries for failing tests
* Custom commands for login and validation in `cypress/support/commands.js`
* Intellisense for custom commands in `cypress/support/index.d.ts`
* Reusable test utilities functions inside `cypress/e2e/utils` 


## Setup

### Pre-requisites

* Install NodeJS and NPM pakcage manager.
* Code Editor of your choice e.g. Visual Studio Code
* GIT Client (for remote tracking)

#### Optional
* Install [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=CliffSu.cypress-snippets) VS Code Extension that includes the most common cypress snippets.

### Setup from Scratch

* `npm init` to setup node project with package.json
* `npm install --save-dev cypress` to install cypress as dev dependency
* `npx cypress open` to open the cypress test runner and choose `E2E Testing` which will create cypress config, support and fixture folders.
* Choose browser of your choice, and scaffold examples which will create boilerplate specs within e2e folder.
* Remove the default boilerplate specs from `cypress/e2e` folder
* Add `.gitignore` to exclude files and folders from GIT
* Add `README.md` to document
* Start with writing tests under `cypress/e2e` directory.

### Using existing framework

* Clone git repo
* Navigate to folder and open terminal
* Run `npm install` to install the framework dependencies

#### Pre-requistes 

* Register with a new user on the website manually for first time.
* Save the login credentials for registered user under `cypress/fixtures/users.json`
  
> To add IntelliSense for IDE like VS Code, add the [Triple slash directives](https://docs.cypress.io/guides/tooling/IDE-integration#Triple-slash-directives) to the head of test file or use the [Refernce type declaration via jsconfig.json](https://docs.cypress.io/guides/tooling/IDE-integration#Triple-slash-directives)


--- 

## Configurarion

* Project specific constants are defined under `cypress/config/constants.js`
* URL routes for pages are defined under `cypress/config/routes.js`. This allows to open the page directly by calling the `open()` method of page.
* Environment specific Cypress settings are placed inside JSON files per enironment in `settings/{environmentName}.settings.json` file. This allows to load separaete settings per environment.
* [Configuration](https://docs.cypress.io/guides/references/configuration)
* [Cypress.config](https://docs.cypress.io/api/cypress-api/config)
* [How To Load Cypress Settings Per Environment](https://glebbahmutov.com/blog/load-cypress-env-settings/)
* [Cypress basics: Using baseUrl](https://filiphric.com/cypress-basics-using-baseurl)
* 

---

## Running tests

* [Command Line](https://docs.cypress.io/guides/guides/command-line)
* [Environment Variables](https://docs.cypress.io/guides/guides/environment-variables)
* `npx cypress open` will open the cypress test runner so you can run the tests from it
* `npx cypress run` will run all the test spec files located within `cypress/e2e` folder. By default test are run in headless mode on electron browser.
* If you want to run test on specific browser, you can provide with `--browser` argument like `--browser chrome`.
* To run tests in headed mode, pass argument `--headed`
* To run a specific test spec, use the following cmd syntax:
  `npx cypress run --spec cypress/e2e/tests/AddToCartTest.cy.js --headed --browser chrome` will run the tests from AddToCartTest spec on chrome browser in headed mode.
* Following custom test scripts are setup in `package.json` to run specific test suites in headless format:
  * `npm run test:registration`
  * `npm run test:login`
  * `npm run test:productData`
  * `npm run test:addToCart`
  * `npm run test:wishlist`
  * `npm run test:productSearch`
* You can also filter the tests based on tag by providing `--env grepTags="<tag>"`
  * For example, To run the tests that are tagged as `@smoke`:
    * `npx cypress run --spec cypress/e2e/tests/AddToCartTest.cy.js --env grepTags="@smoke"`
    * To use the command line args with npm run scripts, append an extra `--`
      * `npm run test:addToCart -- --env grepTags="@smoke"`
  * Similarly you can filter the test based on its title by providing ` --env grep="<substring_in_spec_title>`
* To run the tests on any specific browser in headed mode:
  * For example, `npm run test:addToCart -- --env grepTags="@smoke" --headed --browser chrome` will run the smoke tests from addToCart spec on chrome browser in headed mode
* You can also change baseUrl, configuration files and enironment variables during test execution by passing the `environmentName` enviornment variable.
* Summing up all the above configuration, here is an example:
  * `npm run test:registration -- --env environmentName="stage",grepTags="@smoke" --headed --browser chrome` will run tests with following configurations:
    *  **spec** `RegistrationTest.cy.js` 
    *  **browser** `chrome`
    *  **mode** `headed`
    *  **tag** `smoke`
    *  **environmentName** `stage`
    *  **baseUrl** `https://stage.naveenautomationlabs.com/opencart/index.php`


* Terminal output shows the results summary as: 
  
<img src="doc/results-terminal-output.PNG">

---

## Test Reporting

* This framework uses [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) to generate test reports.
* HTML Reports are generated by default in root/cypress/reports folder.
* It embeds the screenshots of tests on failure automatically to the report, and also attaches the videos to report. 
* It also allows the customization of report with better control of how and where report is generated.
* This is how the report dashboard looks like:
  
<img src="doc/mochaawesome-report-overview.PNG">

* Some ther reporting possibilities are:
  * [mochawesome](https://www.npmjs.com/package/mochawesome)
  * [cypress-allure-plugin](https://www.npmjs.com/package/@shelex/cypress-allure-plugin)

* If a test case is failed, then the assertion error, screenshot and video gets attached to report automatically. 
  * When a test retries, Cypress will continue to take screenshots for each failed attempt or cy.screenshot() and suffix each new screenshot with (attempt n), corresponding to the current retry attempt number.

  
<img src="doc/mochawesome-failed-test-report.png">