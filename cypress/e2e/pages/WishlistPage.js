import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class WishlistPage extends BasePage{

    get wishlistItems() { return cy.get('h2 + div>table>tbody>tr'); }
    get removeFromWishlistBtn() { return cy.get('[data-original-title="Remove"]'); }
    get emptyWishlistDesc() { return cy.get('#content>h2+p'); }

    open() {
        return super.open(ENDPOINT_PREFIX + routes.WISHLIST_ENDPOINT)
    }

    getItemsAddedToWishlist() {
        let wishlistItemsArr = [];

        this.wishlistItems.each(
            ($row, index, $rows) => {

            //within() scopes all subsequent cy commands to within this element. 
            cy.wrap($row).within( () => {

                cy.get("td:nth-of-type(2) a").each(($col, index, $cols) => {
                        cy.log($col.text())
                        wishlistItemsArr.push($col.text())
                })
            })
           
        })

        return cy.wrap(wishlistItemsArr);  //Wrap elements to continue executing commands
    }

    removeItemsFromWishlist() {

        //Since the page refreshes after button click() so we can't use cypress.each() method to iterate over the list of buttons
        /* this.removeFromWishlistBtn.each(($button) => {
            cy.wrap($button).click();
        }) */


        //To work around this issue, we are looping over the length of buttons, and then calling the click() method in loop
        this.removeFromWishlistBtn.then($buttons => {
            const buttonCount = $buttons.length;
            for (let i = 0; i < buttonCount; i++) {
                this.removeFromWishlistBtn.eq(0).click();
              }
        })

        
    }

}


export default new WishlistPage();

