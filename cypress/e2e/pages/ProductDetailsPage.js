import BasePage from "./BasePage";

class ProductDetailsPage extends BasePage{

    get addToCartBtn() { return cy.get('#button-cart'); }
    get alert() { return cy.get('#product-product .alert'); }

    addProductToCart() {
        this.addToCartBtn.click();
    }

}


export default new ProductDetailsPage();

