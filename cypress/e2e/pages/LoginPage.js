class LoginPage{

    elements = {
        continueBtn : () => cy.get('a').contains('Continue'),
        loginInput  : () => cy.get('#input-email'),
        passwordInput : () => cy.get('#input-password'),
        loginBtn : () => cy.get("input[value='Login']"),
        alertMsg : () => cy.get('#account-login .alert'),
    }

    openUrl() {
        cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
    }

    openRegistrationPage() {
        this.openUrl();
        this.elements.continueBtn().click();
    }

    loginWithUI(email, password) {
        this.openUrl();
        this.elements.loginInput().type(email)
        this.elements.passwordInput().type(password)
        this.elements.loginBtn().click()
    }

}


export default new LoginPage();

