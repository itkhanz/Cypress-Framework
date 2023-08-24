export default class HeaderComponent {

    get searchInput() { return cy.get('#search input[name="search"]'); }
    get searchBtn() { return cy.get('#search button'); }
    get myAccountDropdown() { return cy.get('#top-links a[title="My Account"]'); }
    get shoppingCart() { return cy.get('#top-links a[title="Shopping Cart"]'); }
    get logoutLink() { return cy.get('#top-links a').contains('Logout'); }
    get wishListMenu() { return cy.get('#top-links #wishlist-total'); }

    searchProduct(product) {
        this.searchInput.clear()
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

    openWishlist() {
        this.wishListMenu.click();
    }

}
