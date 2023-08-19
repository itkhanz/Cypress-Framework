class RegisterPage {


     elements = {
        firstnameInput : () => cy.get('#input-firstname'),
        lastnameInput : () => cy.get('#input-lastname'),
        emailInput : () => cy.get('#input-email'),
        telephoneInput : () => cy.get('#input-telephone'),
        passwordInput : () => cy.get('#input-password'),
        passwordConfirmInput : () => cy.get('#input-confirm'),
        policyCheckbox : () => cy.get('input[type="checkbox"][name="agree"]'),
        continueBtn : () => cy.get('input[type="submit"][value="Continue"]'),
        successMessage : () => cy.get('#content h1') 
    }


    enterfirstName(username) {
        this.elements.firstnameInput().type(username);
        return this;
    }

    enterlastName(lastname) {
        this.elements.lastnameInput().type(lastname);
        return this;
    }

    enterPassword(password) {
        this.elements.passwordInput().type(password);
        return this;
    }

    enterConfirmPassword(password) {
        this.elements.passwordConfirmInput().type(password);
        return this;
    }

    enterEmail(email) {
        this.elements.emailInput().type(email);
        return this;
    }

    enterTelephone(telephone) {
        this.elements.telephoneInput().type(telephone);
        return this;
    }

    confirmPolicy(value) {

        if(value) {
            this.elements.policyCheckbox().check();
        } else {
            this.elements.policyCheckbox().uncheck();
        }
        return this;
    }

    submitRegistraion() {
        this.elements.continueBtn().click();
    }


}


export default new RegisterPage();

