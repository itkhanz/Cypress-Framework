import BasePage from "./BasePage";

class AccountPage extends BasePage{

    //refer to the elements in tests as AccountPage.elements.h1Heading()
    /* elements = {
        h1Heading : () => cy.get('#content h1') ,
        h2Heading : () => cy.get('#content h2'),
    } */

    //Alternative better approach is to define the getters for elements and refer to them in tests directly as AccountPage.h1Heading
    // In JavaScript, getters are special methods that allow you to access an object's properties like they were regular properties, 
    //but you can also execute code when they are accessed.
    get h1Heading() {return cy.get('#content h1')};
    get h2Heading() {return cy.get('#content h2')};

}


export default new AccountPage();

