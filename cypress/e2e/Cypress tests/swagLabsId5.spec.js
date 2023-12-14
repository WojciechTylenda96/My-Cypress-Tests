/// <reference types="cypress" />

const loginNaddToCart = () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[placeholder="Username"]').type('standard_user');
    cy.get('[placeholder="Password"]').type('secret_sauce');
    cy.get('[name="login-button"]').click();
    cy.get('.inventory_list button').first().click();
}

describe('finishing order', () => {
    beforeEach(() => {
        loginNaddToCart();
    });

    it('all inputs are correct', () => {
        cy.get('.shopping_cart_link').click();
    })
})