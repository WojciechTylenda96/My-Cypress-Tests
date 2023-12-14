/// <reference types="cypress" />

const login = () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[placeholder="Username"]').type('standard_user');
    cy.get('[placeholder="Password"]').type('secret_sauce');
    cy.get('[name="login-button"]').click();
}


describe('add and remove products', () => {
    
    beforeEach(() => {
        login();
    });

    it('add from home page', () => {
        cy.get('.inventory_list button').first().as('btn');
        cy.get('@btn').should('contain', 'Add to cart')
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove')
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_list').find('.cart_item').should('exist');
    })

    it('add from product page', () => {
        cy.get('.inventory_list .inventory_item_name ').first().click();
        cy.get('button.btn_inventory').as('btn');
        cy.get('@btn').should('contain', 'Add to cart');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove');
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_list').find('.cart_item').should('exist');
    })

    it('delete from homepage', () => {
        cy.get('.inventory_list button').first().as('btn');
        cy.get('@btn').should('contain', 'Add to cart')
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove')
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Add to cart')
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_list').find('.cart_item').should('not.exist')
    })

    it('delete form product page', () => {
        cy.get('.inventory_list button').first().as('btn');
        cy.get('@btn').should('contain', 'Add to cart');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove');
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('.inventory_list .inventory_item_name ').first().click();
        cy.get('button.btn_inventory').as('btn');
        cy.get('@btn').should('contain', 'Remove');
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Add to cart');
        cy.get('.shopping_cart_badge').should('not.exist');
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_list').find('.cart_item').should('not.exist');
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