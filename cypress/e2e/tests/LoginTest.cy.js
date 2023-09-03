import AccountPage from "../pages/AccountPage";
import BasePage from "../pages/BasePage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", { tags: ['@Login', '@regression'] }, () => {

    let basePage;

    before(() => {
        basePage = new BasePage();
    })

    //Mocha automatically shares contexts for us across all applicable hooks for each test. 
    //Additionally these aliases and properties are automatically cleaned up after each test.
    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    
    it("should login successfully with valid credentials", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        AccountPage.h2Heading
            .should('contains.text', 'My Account');
    })

    it("should fail to login with invalid credentials", {tags: '@smoke'}, function () {

        LoginPage
            .loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password)

        LoginPage.alertMsg
            .should('contains.text', 'Warning');
    })

    it("should perform login and logout", function () {

        cy.login(); //login via custom command

        basePage.header.performLogout();

        AccountPage.h1Heading
            .should('contains.text', 'Account Logout');
    })
})