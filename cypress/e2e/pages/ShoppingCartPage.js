import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class ShoppingCartPage extends BasePage{

    get cartItems() { return cy.get('form table>tbody>tr'); }
    get checkoutBtn() { return cy.get('a').contains('Checkout'); }

    open() {
        return super.open(ENDPOINT_PREFIX + routes.CART_ENDPOINT)
    }

    performCheckout() {
        this.checkoutBtn.click();
    }

    getItemsAddedToCart() {
        let cartItems = [];

        this.cartItems.each(
            ($row, index, $rows) => {

            //within() scopes all subsequent cy commands to within this element. 
            cy.wrap($row).within( () => {

                cy.get("td:nth-of-type(2) a").each(($col, index, $cols) => {
                        cy.log($col.text())
                        cartItems.push($col.text())
                })
            })
           
        })

        return cy.wrap(cartItems);  //Wrap elements to continue executing commands
    }

}


export default new ShoppingCartPage();

