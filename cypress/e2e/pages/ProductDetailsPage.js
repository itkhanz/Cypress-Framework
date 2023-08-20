import BasePage from "./BasePage";

class ProductDetailsPage extends BasePage{

    get addToCartBtn() { return cy.get('#button-cart'); }
    get alert() { return cy.get('#product-product .alert'); }

    get productName() { return cy.get('#content h1'); }
    get productPrice() { return cy.get('#content #product').prev('ul').find('h2'); }
    get productDescription() { return cy.get('#content .intro'); }

    addProductToCart() {
        this.addToCartBtn.click();
    }

}


export default new ProductDetailsPage();

