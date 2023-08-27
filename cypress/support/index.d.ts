declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Custom command to login via UI
         * It reads the valid credentials from fixtures and call LoginPage.loginWithUI(email, password)
         * @example cy.login()
         */
        login(): Chainable<void>;
    }
}
  