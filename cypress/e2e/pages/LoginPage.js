import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class LoginPage extends BasePage{

    get continueBtn() { return cy.get('a').contains('Continue'); }
    get loginInput() { return cy.get('#input-email'); }
    get passwordInput() { return cy.get('#input-password'); }
    get loginBtn() { return cy.get("input[value='Login']"); }
    get alertMsg() { return cy.get('#account-login .alert'); }

    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
    }

    openRegistrationPage() {
        this.open();
        this.continueBtn.click();
    }

    loginWithUI(email, password) {
        this.open();
        this.loginInput.type(email)
        this.passwordInput.type(password)
        this.loginBtn.click()
    }

}


export default new LoginPage();

