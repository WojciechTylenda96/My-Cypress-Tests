/// <reference types="cypress" />

import { onInventoryPage } from "../../support/page_objects/inventoryPage";
import { onLoginPage } from "../../support/page_objects/loginPage";
import { navigateTo } from "../../support/page_objects/navigationPage";

describe('login variants', () => {

    it('login with correct log&pass', () => {
        onLoginPage.logIn('standard_user', 'secret_sauce')
    })

    it('one or more field are empty, should pop up error message', () => {
        onLoginPage.verifyLogIn('Username');
        onLoginPage.verifyLogIn('Password');
        onLoginPage.verifyLogIn();
    })

    it('inputs data are wrong, should pop up error message', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[placeholder="Username"]').type('badLogin');
        cy.get('[placeholder="Password"]').type('basPassword');
        cy.get('[name="login-button"]').click();
        cy.get('form').find('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
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
        navigateTo.productDetailsByItemIndex(0)
        onInventoryPage.addItemToCartFromProductDetailPage()
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