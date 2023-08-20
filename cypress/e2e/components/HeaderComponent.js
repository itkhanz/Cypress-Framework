export default class HeaderComponent {

    elements = {
        searchInput : () => cy.get('input[name="search"]'),
        searchBtn : () => cy.get('#search button'),
        myAccountDropdown : () => cy.get('#top-links a[title="My Account"]'),
        logoutLink : () => cy.get('#top-links a').contains('Logout'),
    }

    searchProduct(product) {
        this.elements.searchInput().type(product);
        this.elements.searchBtn().click();
    }

    performLogout() {
        this.elements.myAccountDropdown().click();
        this.elements.logoutLink().click();
    }

}
