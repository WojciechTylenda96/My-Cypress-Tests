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
            } else if(emptyField === 'lastName'){
                cy.wrap(inputField).eq(1).clear();
            } else{
                cy.wrap(inputField).eq(2).clear();
            }
        })
    }

}

export const onCheckoutPage = new CheckoutPage();