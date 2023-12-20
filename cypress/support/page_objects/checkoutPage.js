/// <reference types="cypress" />

export class CheckoutPage {

    inputValues(emptyField) {

        const data = ['Steven', 'Khada', '16-555']
        cy.wrap(data).each((data, index) => {
            cy.get('.checkout_info input').eq(index).type(data)
        })
        cy.get('.checkout_info input').then(inputField => {
            if(emptyField === 'firstName'){
                cy.wrap(inputField).eq(0).clear();
                cy.get('#continue').click();
                cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
            } else if(emptyField === 'lastName'){
                cy.wrap(inputField).eq(1).clear();
                cy.get('#continue').click();
                cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required');           
            } else if(emptyField === 'postalCode'){
                cy.wrap(inputField).eq(2).clear();
                cy.get('#continue').click();
                cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required');
            } else {
                cy.get('#continue').click();
                cy.get('#finish').click();
                cy.get('.pony_express').should('have.attr', 'src')
                cy.get('.complete-header').should('contain', 'Thank you for your order!')
                cy.get('.complete-text').should('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
                cy.get('#back-to-products').should('exist')
            }
        })
    }

}

export const onCheckoutPage = new CheckoutPage();