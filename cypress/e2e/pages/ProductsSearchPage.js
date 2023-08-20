import BasePage from "./BasePage";

class ProductsSearchPage extends BasePage{

    elements = {
        productCard : (productName) => cy.get(`#content .product-thumb img[title='${productName}']`).parents('.product-thumb'),
        alert : () => cy.get('#product-search .alert')     
    }

    openProduct(productName) {
        this.elements.productCard(productName).find('.caption h4 a').click();
    }

    addProductToCart(productName) {
        this.elements.productCard(productName).find('button').contains('Add to Cart').click({force: true});
    }

}


export default new ProductsSearchPage();

