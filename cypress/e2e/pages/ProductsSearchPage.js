import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class ProductsSearchPage extends BasePage{

    get productCard() { return (productName) => cy.get(`#content .product-thumb img[title='${productName}']`).parents('.product-thumb'); }
    get alert() { return cy.get('#product-search .alert'); }

    get productName() { return (productName) => this.productCard(productName).find('.caption h4 a')}
    get productDescription() { return (productName) => this.productCard(productName).find('.caption p').first()}
    get productPrice() { return (productName) => this.productCard(productName).find('.caption .price')}

    get sortDropdown() { return cy.get('#input-sort'); }
    get allProductsPrices() { return cy.get('.price'); }
    get allProductNames() { return cy.get('.caption h4 a'); }

    get catrgoryDropdown() { return cy.get('select[name="category_id"]'); }
    get searchBtn() { return cy.get('#button-search'); }

    open() {
        return super.open(ENDPOINT_PREFIX + routes.PRODUCT_SEARCH_ENDPOINT)
    }

    openProduct(productName) {
        this.productCard(productName).find('.caption h4 a').click();
    }

    addProductToCart(productName) {
        this.productCard(productName).find('button').contains('Add to Cart').click({force: true});
    }   

    sortSearchResultsBy(sortingCriteria) {
        this.sortDropdown.select(sortingCriteria);
    }

    filterSearchResultsByCategory(category) {
        this.catrgoryDropdown.select(category);
    }

    applyFilter() {
        this.searchBtn.click();
    }

    getAllProductNames() {
        const productNamesArr = []
        this.allProductNames.each(($productName) => productNamesArr.push($productName.text()));
        
        //This will evaluate to true if value is not:
        //null, undefined, NaN, empty String(""), 0 or false
        //Helps in validation that array returned is not empty or
        if(productNamesArr) {
            return productNamesArr;
        }
        return null;
    }

}


export default new ProductsSearchPage();

