/// <reference types="cypress" />

import { onInventoryPage } from "../../support/page_objects/iventoryPage";
import { onLoginPage } from "../../support/page_objects/loginPage";
import { navigateTo } from "../../support/page_objects/navigationPage";

describe('login', () => {

    it('login with correct log&pass', () => {
        onLoginPage.logIn('standard_user', 'secret_sauce')
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

    it.only('delete from product page', () => {
        onInventoryPage.addItemToCartFromHomePageByIndex(2);
        navigateTo.productDetailsByItemIndex(2);
        onInventoryPage.deleteItemAtProductDetailsPage();
        navigateTo.shopCart();
        onInventoryPage.checkIfItemDeletedFromCart();

    })

    it('delete from shop cart', () => {
        cy.get('.inventory_list button').first().as('btn');
        cy.get('@btn').should('contain', 'Add to cart');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove');
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_list').find('.cart_item').should('exist');
        cy.get('.item_pricebar button').as('btn2');
        cy.get('@btn2').should('contain', 'Remove');
        cy.get('@btn2').click();
        cy.get('.cart_list').find('.cart_item').should('not.exist')
    })

})