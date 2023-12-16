import { onInventoryPage } from "../../support/page_objects/iventoryPage";
import { onLoginPage } from "../../support/page_objects/loginPage"

describe('page objects', () => {
    
    it.only('should add item from home page as from product item page', () => {
        onLoginPage.logIn('standard_user', 'secret_sauce');
        onInventoryPage.addItemToCartFromHomePageByIndex(2);
        onInventoryPage.resetAppStatus();
        onLoginPage.logIn('standard_user', 'secret_sauce');
        onInventoryPage.addItemToCartFromHomePageByIndex(4);
    })

})