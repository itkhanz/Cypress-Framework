export default class HeaderComponent {

    get searchInput() { return cy.get('input[name="search"]'); }
    get searchBtn() { return cy.get('#search button'); }
    get myAccountDropdown() { return cy.get('#top-links a[title="My Account"]'); }
    get shoppingCart() { return cy.get('#top-links a[title="Shopping Cart"]'); }
    get logoutLink() { return cy.get('#top-links a').contains('Logout'); }

    searchProduct(product) {
        this.searchInput.type(product);
        this.searchBtn.click();
    }

    performLogout() {
        this.myAccountDropdown.click();
        this.logoutLink.click();
    }

    openShoppingCart() {
        this.shoppingCart.click()
    }

}
