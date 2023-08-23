import BasePage from "../pages/BasePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductsSearchPage from "../pages/ProductsSearchPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
// import * as constants from "../config/constants";  
import { PRODUCT_TO_TEST as PRODUCT } from "../config/constants";  

describe("adding products to cart", () => {

    let basePage;

    before(() => {
        basePage = new BasePage();
    })

    beforeEach(() => {
        cy.login(); //login via custom command
        basePage.header.searchProduct(PRODUCT);
    })

    it("should add product to the cart from products search page", {tags: ['@regression', '@smoke', '@Cart']}, function () {
        
        ProductsSearchPage
            .addProductToCart(PRODUCT);

        ProductsSearchPage.alert
            .should('contains.text', `Success: You have added ${PRODUCT} to your shopping cart!`)
    })


    it("should add product to the cart from product details page", {tags: ['@regression', '@Cart']}, function () {

        ProductsSearchPage
            .openProduct(PRODUCT);

        ProductDetailsPage
            .addProductToCart();

        ProductDetailsPage.alert
            .should('contains.text', `Success: You have added ${PRODUCT} to your shopping cart!`)
    })

    it("should validate the presence of product in cart", {tags: ['@regression', '@Cart']}, function () {

        ProductsSearchPage
            .addProductToCart(PRODUCT);

        basePage.header.openShoppingCart();

        ShoppingCartPage.getItemsAddedToCart(PRODUCT).should('include', PRODUCT);

    })
})