import BasePage from "./BasePage";

class ProductDetailsPage extends BasePage{

    elements = {
        addToCartBtn : () => cy.get('#button-cart'),
        alert : () => cy.get('#product-product .alert')
        
    }

    addProductToCart() {
        this.elements.addToCartBtn().click();
    }

}


export default new ProductDetailsPage();

