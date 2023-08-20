import BasePage from "../pages/BasePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductsSearchPage from "../pages/ProductsSearchPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";

describe("adding products to cart", () => {

    let basePage;
    const PRODUCT = "MacBook";

    beforeEach(() => {
        cy.login(); //login via custom command
        basePage = new BasePage();
        basePage.header.searchProduct(PRODUCT);
    })

    it("should add product to the cart from products search page", function () {

        ProductsSearchPage
            .addProductToCart(PRODUCT);

        ProductsSearchPage
            .elements.alert()
            .should('contains.text', `Success: You have added ${PRODUCT} to your shopping cart!`)
    })


    it("should add product to the cart from product details page", function () {

        ProductsSearchPage
            .openProduct(PRODUCT);

        ProductDetailsPage
            .addProductToCart();

        ProductDetailsPage
            .elements.alert()
            .should('contains.text', `Success: You have added ${PRODUCT} to your shopping cart!`)
    })

    it("should validate the presence of product in cart", function () {

        ProductsSearchPage
            .addProductToCart(PRODUCT);

        basePage.header.openShoppingCart();

        ShoppingCartPage.getItemsAddedToCart(PRODUCT).should('include', PRODUCT);

    })
})