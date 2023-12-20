/// <reference types="cypress" />

import { onInventoryPage } from "../../support/page_objects/inventoryPage";
import { onLoginPage } from "../../support/page_objects/loginPage";
import { navigateTo } from "../../support/page_objects/navigationPage";

describe('login', () => {

    it('login with correct log&pass', () => {
        onLoginPage.logIn('standard_user', 'secret_sauce')
    })

    it.only('one or more field are empty', () => {
        onLoginPage.verifyLogIn('Username');
        onLoginPage.verifyLogIn('Password');
        onLoginPage.verifyLogIn();
    })
})



describe('add and remove products', () => {
    
    beforeEach(() => {
        onLoginPage.logIn('standard_user', 'secret_sauce');
    });

    afterEach(() => {
        onInventoryPage.resetAppStatus();
    })

    it('add from home page', () => {
        onInventoryPage.addItemToCartFromHomePageByIndex(0);
        navigateTo.shopCart();
        onInventoryPage.checkIfItemAddedToCart();
    })

    it('add from product page', () => {
        onInventoryPage.addItemToCartFromProductDetailPageByIndex(0)
        navigateTo.shopCart();
        onInventoryPage.checkIfItemAddedToCart();
    })

    it('delete from homepage', () => {
        onInventoryPage.addItemToCartFromHomePageByIndex(2)
        onInventoryPage.deleteItemAtHomePageByItemIndex(2);
        navigateTo.shopCart();
        onInventoryPage.checkIfItemDeletedFromCart();
    })

    it('delete from product page', () => {
        onInventoryPage.addItemToCartFromHomePageByIndex(2);
        navigateTo.productDetailsByItemIndex(2);
        onInventoryPage.deleteItemAtProductDetailsPage();
        navigateTo.shopCart();
        onInventoryPage.checkIfItemDeletedFromCart();

    })

    it('delete from shop cart', () => {
        onInventoryPage.addItemToCartFromHomePageByIndex(3);
        navigateTo.shopCart();
        onInventoryPage.deleteItemAtShopCart();
        onInventoryPage.checkIfItemDeletedFromCart()
    })

})