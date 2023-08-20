import AccountPage from "../pages/AccountPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"

import { faker } from '@faker-js/faker';

describe("Registration Flow", () => {

    //Unique credentials are required for registration, so we use faker library to generate test data
    it("should register the new user", ()=> {

        LoginPage.openRegistrationPage();

        let password = faker.internet.password();

        RegisterPage
            .enterfirstName(faker.person.firstName())
            .enterlastName(faker.person.lastName())
            .enterEmail(faker.internet.email())
            .enterTelephone(faker.phone.number())
            .enterPassword(password)
            .enterConfirmPassword(password)
            .confirmPolicy(true)
            .submitRegistraion()
            ;

        AccountPage.h1Heading
            .should('have.text', 'Your Account Has Been Created!');

    })
})