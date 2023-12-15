/// <reference types="cypress" />

const loginAndAddToCart = () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[placeholder="Username"]').type('standard_user');
    cy.get('[placeholder="Password"]').type('secret_sauce');
    cy.get('[name="login-button"]').click();
    cy.get('.inventory_list button').first().click();
    cy.get('.shopping_cart_link').click();
    cy.get('[name="checkout"]').click();
}

const text = ['Steven', 'Khada', '16-555']

describe('finishing order', () => {
    beforeEach(() => {
        loginAndAddToCart();
    });

    it('all inputs are correct', () => {
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

    it('all inputs are empty', () => {
        cy.get('.shopping_cart_link').click();
        cy.get('[name="checkout"]').click();
        cy.get('#continue').click();
        cy.get('.checkout_info input').each((input, index) => {
            cy.wrap(input).should('have.class', 'error');
            cy.wrap(input).should('exist', 'error_icon');
        })
        cy.get('[data-test="error"]').should('exist')
    })
    
    it('name is empty', () => {
        cy.get('.checkout_info input').then(input => {
            cy.wrap(input).eq(0).clear().should('be.empty')
            cy.wrap(input).eq(1).clear().type(text[1]).should('have.value', text[1])
            cy.wrap(input).eq(2).clear().type(text[2]).should('have.value', text[2])
        })
        cy.get('#continue').click();
        cy.get('.checkout_info input').eq(0).should('have.class', 'error');
        cy.get('.checkout_info input').eq(0).should('exist', 'error_icon');
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')

    })

    it('lastname is empty', () => {
        cy.get('.checkout_info input').then(input => {
            cy.wrap(input).eq(0).clear().type(text[0]).should('have.value', text[0]);
            cy.wrap(input).eq(1).clear().should('be.empty');
            cy.wrap(input).eq(2).clear().type(text[2]).should('have.value', text[2]);
        })
        cy.get('#continue').click();
        cy.get('.checkout_info input').eq(1).should('have.class', 'error');
        cy.get('.checkout_info input').eq(1).should('exist', 'error_icon');
        cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required')

    })

    it('postal code is empty', () => {
        cy.get('.checkout_info input').then(input => {
            cy.wrap(input).eq(0).clear().type(text[0]).should('have.value', text[0]);
            cy.wrap(input).eq(1).clear().type(text[1]).should('have.value', text[1]);
            cy.wrap(input).eq(2).clear().should('be.empty');
        })
        cy.get('#continue').click();
        cy.get('.checkout_info input').eq(2).should('have.class', 'error');
        cy.get('.checkout_info input').eq(2).should('exist', 'error_icon');
        cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required')
    })
    
})
