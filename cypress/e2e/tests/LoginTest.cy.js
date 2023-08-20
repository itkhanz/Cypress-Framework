import AccountPage from "../pages/AccountPage";
import LoginPage from "../pages/LoginPage";

describe("Success and Fail login flow", () => {

    //Mocha automatically shares contexts for us across all applicable hooks for each test. 
    //Additionally these aliases and properties are automatically cleaned up after each test.
    beforeEach(() => {

        //Aliasing cy.fixture() data and then using this to access it via the alias.
        //Note the use of the standard function syntax. 
        //Using arrow functions to access aliases via this won't work because of the lexical binding of this.

        cy.fixture('users.json').as('users')
    })

    
    it("should login successfully with valid credentials", function () {

        LoginPage
            .loginWithUI(this.users.validUser.email, this.users.validUser.password)

        AccountPage
            .elements
            .accountHeading()
            .should('contains.text', 'My Account');
    })

    it("should fail to login with invalid credentials", function () {

        LoginPage
            .loginWithUI(this.users.invalidUser.email, this.users.invalidUser.password)

        LoginPage
            .elements
            .alertMsg()
            .should('contains.text', 'Warning');
    })
})