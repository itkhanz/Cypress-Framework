import BasePage from "../pages/BasePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductsSearchPage from "../pages/ProductsSearchPage";

describe('product details and search', () => {

    let basePage;

    beforeEach(() => {
        cy.visit('');
        basePage = new BasePage();

         // alias the product fixtures
         cy.fixture('product.json').as('productData')
    });

    it('validate the product data on products search page', () => {
        
        // use the special '@' syntax to access aliases which avoids the use of 'this'
        cy.get('@productData').then((productData) => {
            basePage
                .header.searchProduct(productData.name);

            // we pass the product name to filter the product card for specific product 
            // which gives us the name, price and description based on product name
            ProductsSearchPage
                .productName(productData.name) 
                .should('have.text', productData.name);
            
            ProductsSearchPage
                .productDescription(productData.name)
                .should('contains.text', productData.description);

            ProductsSearchPage
            .productPrice(productData.name).then((price) => {
                const actualPrice = price.text().split("Ex Tax:")[0].split("$")[1].trim();
                expect(actualPrice).to.be.eq(productData.price);
            })
            
        })
    });

    it('validate the product data on product details page', () => {
        
        // use the special '@' syntax to access aliases which avoids the use of 'this'
        cy.get('@productData').then((productData) => {
            basePage
                .header.searchProduct(productData.name);

            ProductsSearchPage.openProduct(productData.name);

            ProductDetailsPage
                .productName
                .should('have.text', productData.name);
            
            ProductDetailsPage
                .productDescription
                .should('contains.text', productData.description);

            ProductDetailsPage
                .productPrice.then((price) => {
                    const actualPrice = price.text().split("$")[1].trim();
                    expect(actualPrice).to.be.eq(productData.price);
                })
            
        })
    });
});