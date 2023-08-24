import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class ProductDetailsPage extends BasePage{

    get addToWishlistBtn() { return cy.get('[data-original-title="Add to Wish List"]').first(); }
    get addToCartBtn() { return cy.get('#button-cart'); }
    get alert() { return cy.get('#product-product .alert'); }

    get productName() { return cy.get('#content h1'); }
    get productPrice() { return cy.get('#content #product').prev('ul').find('h2'); }
    get productDescription() { return cy.get('#content .intro'); }


    open(productID) {
        return super.open(ENDPOINT_PREFIX + routes.PRODUCT_DETAILS_ENDPOINT + productID)
    }

    addProductToCart() {
        this.addToCartBtn.click();
    }

    addProductToWishlist() {
        this.addToWishlistBtn.click();
    }

}


export default new ProductDetailsPage();

