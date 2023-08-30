declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Custom command to login via UI
         * It reads the valid credentials from fixtures and call LoginPage.loginWithUI(email, password)
         * @example cy.login()
         */
        login(): Cypress.Chainable<void>;

        /**
         * Custom Cypress command to validate a form field.
         * @param {Chainable<JQuery<HTMLElement>>} inputField - The input field element.
         * @param {string} message - The expected validation message.
         * @example
         * cy.validateFormField(RegisterPage.firstnameInput, 'Invalid input provided');
         */
        validateFormField(inputField: Chainable<JQuery<HTMLElement>>, message: string): Cypress.Chainable<JQuery<HTMLElement>>;
    }
}
  