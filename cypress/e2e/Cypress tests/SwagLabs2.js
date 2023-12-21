/// <reference types="cypress" />

import { onCheckoutPage } from "../../support/page_objects/checkoutPage";
import { onInventoryPage } from "../../support/page_objects/inventoryPage";
import { onLoginPage } from "../../support/page_objects/loginPage";

describe.only('checking sorting option', () => {
    it('checking sorting options, should change sort variant', () => {
        onLoginPage.logIn('standard_user', 'secret_sauce');
        const arr = [1,2,3,0];
        cy.wrap(arr).each(arr => {
            cy.get('[class="product_sort_container"]').select(arr);
        })
    })
})

const addToCartAndCheckout = () => {
    onInventoryPage.addItemToCartFromHomePageByIndex(0);
    cy.get('.shopping_cart_link').click();
    cy.get('[name="checkout"]').click();
}

const text = ['Steven', 'Khada', '16-555']

describe('finishing order', () => {
    beforeEach(() => {
        onLoginPage.logIn('standard_user', 'secret_sauce');
        addToCartAndCheckout();
    });

    afterEach(() => {
        onInventoryPage.resetAppStatus();
    })

    it('all inputs are correct', () => {
        onCheckoutPage.inputValues();
    })

    it('one input field is empty, error message should appear ', () => {
        onCheckoutPage.inputValues('firstName');
        onCheckoutPage.inputValues('lastName');
        onCheckoutPage.inputValues('postalCode');
    })

    it('all inputs are empty', () => {
        cy.get('#continue').click();
        cy.get('.checkout_info input').each((input) => {
            cy.wrap(input).should('have.class', 'error');
            cy.wrap(input).should('exist', 'error_icon');
        })
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
        cy.get('[data-test="error"]').should('exist')
    })
    
    
    
})
