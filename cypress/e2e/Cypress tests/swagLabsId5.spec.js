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
        cy.get('[name="checkout"]').click();
        
        const text = ['Steven', 'Khada', '16-555']

        cy.get('.checkout_info input').then(input => {
            cy.wrap(input).eq(0).clear().type(text[0]).should('have.value', text[0]);
            cy.wrap(input).eq(1).clear().type(text[1]).should('have.value', text[1]);
            cy.wrap(input).eq(2).clear().type(text[2]).should('have.value', text[2]);
        });
        cy.get('#continue').click();
        cy.get('#finish').click();
        cy.get('.pony_express').should('have.attr', 'src')
        cy.get('.complete-header').should('contain', 'Thank you for your order!')
        cy.get('.complete-text').should('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        cy.get('#back-to-products').should('exist')
    })

    it.only('all inputs are empty', () => {
        cy.get('.shopping_cart_link').click();
        cy.get('[name="checkout"]').click();
        cy.get('#continue').click();
        cy.get('.checkout_info input').each((input, index) => {
            cy.wrap(input).should('have.class', 'error')
            cy.wrap(input).should('exist', 'error_icon')
        })
        cy.get('[data-test="error"]').should('exist')
    })
    
})