import BasePage from "./BasePage";

class ProductsSearchPage extends BasePage{

    get productCard() { return (productName) => cy.get(`#content .product-thumb img[title='${productName}']`).parents('.product-thumb'); }
    get alert() { return cy.get('#product-search .alert'); }

    openProduct(productName) {
        this.productCard(productName).find('.caption h4 a').click();
    }

    addProductToCart(productName) {
        this.productCard(productName).find('button').contains('Add to Cart').click({force: true});
    }

}


export default new ProductsSearchPage();

