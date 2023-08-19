class LoginPage{

    elements = {
        continueBtn : () => cy.get('a').contains('Continue'),
    }

    openRegistrationPage() {
        cy.visit('');
        this.elements.continueBtn().click();
    }

}


export default new LoginPage();

