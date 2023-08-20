import BasePage from "./BasePage";

class AccountPage extends BasePage{

    elements = {
        h1Heading : () => cy.get('#content h1') ,
        h2Heading : () => cy.get('#content h2'),
    }

}


export default new AccountPage();

