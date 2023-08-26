import { SORTING_CRITERIA } from "../config/constants";
import { default as ProductsSearchPage } from "../pages/ProductsSearchPage";
import { extractActualPrices, extractProductsName } from "../utils/ProductUtils";

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
    
            ProductsSearchPage.allProductNames
            .should('not.be.empty')
            .then(($names) => {
                const names = extractProductsName($names);
                const sorted = Cypress._.orderBy(names, [name => name.toLowerCase()])
                expect(sorted).to.deep.equal(names)
            })
        });
    
        it('should check that the products are sorted by Price Name (Z - A)', () => {
            ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.NAME_DESC);
    
            ProductsSearchPage.allProductNames
            .should('not.be.empty')
            .then(($names) => {
                const names = extractProductsName($names);
                const sorted = Cypress._.orderBy(names, [name => name.toLowerCase()], ['desc'])
                expect(sorted).to.deep.equal(names)
            })
    
        });
    });

    context('Categories', () => {
        beforeEach(() => {
            cy.fixture('productCategories.json').as('productCategories');
        });

        it('should filter the search results by category', {tags: '@smoke'}, () => {
            cy.get('@productCategories').then((productCategories) => {

                cy.wrap(productCategories.categories).each(category => {
                    cy.log(`********* Applying category fiter: ${category.categoryName} *********`)
                    ProductsSearchPage.filterSearchResultsByCategory(category.categoryName);
                    ProductsSearchPage.applyFilter();

                    ProductsSearchPage.allProductNames
                    .then(($names) => {
                        const productNamesList = extractProductsName($names);
                        expect(productNamesList).to.include.members(category.products)
                    })
                });
            })
        });
    });

    
});