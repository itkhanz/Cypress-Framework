# Cypress Test Automation Framework


## Setup

### Setup from Scratch

* `npm init` to setup node project with package.json
* `npm install --save-dev cypress` to install cypress as dev dependency
* `npx cypress open` to open the cypress test runner and choose `E2E Testing` which will create cypress config, support and fixture folders.
* Choose browser of your choice, and scaffold examples which will create boilerplate specs within e2e folder.
* Remove the default boilerplate specs from `cypress/e2e` folder
* Add `.gitignore` to exclude files and folders from GIT
* Add `README.md` to document
  

### Using current framework

* clone git repo
* navigate to folder and open terminal
* run `npm install` to install the dependencies

--- 

## Running tests

* `npx cypress open` will open the cypress test runner so you can run the tests from it
* `npx cypress run` will run all the test spec files located within `cypress/e2e` folder
* Following custom test scripts are setup in `package.json` to run specific test suites in headless format:
  * `npm run test:registration`
  * `npm run test:login`
  * `npm run test:productData`
  * `npm run test:addToCart`