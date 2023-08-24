import BasePage from "../pages/BasePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductsSearchPage from "../pages/ProductsSearchPage";

describe('product details and search', { tags: ['@Product', '@regression'] }, () => {

    let basePage;

    before(() => {
        basePage = new BasePage();
    })


    beforeEach(() => {
        cy.visit('');
         // alias the product fixtures
         cy.fixture('product.json').as('productData')
    });

    it('should validate all the products presence in store', {tags: '@smoke'}, () => {

        //This is a demonstration for data-driven testing using fixtures
        //Test will be executed for all the products in products.json file
        cy.fixture('products').then((products) => {

            products.forEach(product => {

                cy.log(product.name);

                basePage
                .header.searchProduct(product.name);

                ProductsSearchPage
                .productName(product.name) 
                .should('have.text', product.name);

            });
        })
    });

    it('should validate the product data on products search page', () => {
        
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

    it('should validate the product data on product details page', () => {
        
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