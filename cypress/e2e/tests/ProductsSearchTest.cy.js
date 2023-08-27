import { SORTING_CRITERIA } from "../config/constants";
import { default as ProductsSearchPage } from "../pages/ProductsSearchPage";
import { extractActualPrices, extractProductsName } from "../utils/ProductUtils";
import productCategories  from "../../fixtures/productCategories.json";

describe('Products meeting the search criteria', { tags: ['@Search', '@regression'] }, () => {

    beforeEach(() => {
        ProductsSearchPage.open();
        //search with a space to show all the products in inventory
        ProductsSearchPage.header.searchProduct(" ");
    });

    context('Sorting', () => {

        it('should check that the products are sorted by Price (Low > High)', {tags: '@smoke'}, () => {
            ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.PRICE_ASC);
    
            ProductsSearchPage.allProductsPrices
            .should('not.be.empty')
            .then(($prices) => {
                const prices = extractActualPrices($prices);
                const sorted = Cypress._.sortBy(prices)
                expect(sorted).to.deep.equal(prices)
            })
        });
    
        it('should check that the products are sorted by Price (High > Low)', () => {
            ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.PRICE_DESC);
    
            ProductsSearchPage.allProductsPrices
            .should('not.be.empty')
            .then(($prices) => {
                const prices = extractActualPrices($prices);
                const sorted = Cypress._.sortBy(prices).reverse();
                expect(sorted).to.deep.equal(prices)
            })
        });
    
        it('should check that the products are sorted by Name (A - Z)', () => {
            ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.NAME_ASC);

            //Approach 1
            const productNames = ProductsSearchPage.getAllProductNames();
            const sortedNames =  productNames.sort();
            cy.wrap(sortedNames)
                .should('deep.equal', productNames)
                //.and('not.be.empty')
                //.and('not.be.undefined')
                //.and('not.be.null')
    
            //Approach 2
            /* ProductsSearchPage.allProductNames
            .should('not.be.empty')
            .then(($names) => {
                const productNames = extractProductsName($names);
                const sortedNames = Cypress._.orderBy(productNames, [name => name.toLowerCase()])
                expect(sortedNames).to.deep.equal(productNames)
            }) */
        });
    
        it('should check that the products are sorted by Price Name (Z - A)', () => {
            ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.NAME_DESC);

            //Approach 1
            const productNames = ProductsSearchPage.getAllProductNames();
            const sortedNames =  productNames.sort().reverse();
            cy.wrap(sortedNames)
                .should('deep.equal', productNames);

            //Approaach 2
            /* ProductsSearchPage.allProductNames
            .should('not.be.empty')
            .then(($names) => {
                const names = extractProductsName($names);
                const sorted = Cypress._.orderBy(names, [name => name.toLowerCase()], ['desc'])
                expect(sorted).to.deep.equal(names)
            }) */
    
        });
    });

    context('Categories', () => {

        /************ This approach creates tests dynamically based on loaded test data  ************/
        productCategories.categories.forEach(category => {
        
            it(`should filter the search results by category: ${category.categoryName}`, {tags: '@smoke'}, () => {
                ProductsSearchPage.filterSearchResultsByCategory(category.categoryName);
                ProductsSearchPage.applyFilter();

                //Approach 1
                const productNames = ProductsSearchPage.getAllProductNames();
                cy.wrap(productNames)
                    .should('include.members', category.products);

                //Approach 2
                /* ProductsSearchPage.allProductNames
                .then(($names) => {
                    const productNamesList = extractProductsName($names);
                    expect(productNamesList).to.include.members(category.products)
                }) */

            });
        
        });


        /************ This approach considers it the same test and run 2 times with different data ***************/
        /* beforeEach(() => {
            cy.fixture('productCategories.json').as('productCategories');
        });

        it('should filter the search results by category', {tags: '@smoke'}, () => {
            cy.get('@productCategories').then((productCategories) => {

                cy.wrap(productCategories.categories).each(category => {
                    cy.log(`********* Applying category fiter: ${category.categoryName} *********`)
                    ProductsSearchPage.filterSearchResultsByCategory(category.categoryName);
                    ProductsSearchPage.applyFilter();

                    const productNames = ProductsSearchPage.getAllProductNames();
                    cy.wrap(productNames)
                        .should('include.members', category.products);

                });
            })
        }); */
    });

    
});