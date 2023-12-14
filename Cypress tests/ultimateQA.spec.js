/// <reference types="cypress" />

describe('ultimateqa.com tests', () => {

    it('sprint 1', () => {
        cy.visit('https://ultimateqa.com/automation#');
        cy.get('.et_pb_text_inner').find('li').then(linksList => {
            cy.wrap(linksList).eq(4).find('a').click();
        })
        cy.wait(1000);
        cy.get('form').then(form => {
            cy.wrap(form).find('[name="firstname"]').type('Michael');
            cy.wrap(form).find('[type="submit"]').click();
        })
    })

    it('sprint 2', () => {
        cy.visit('https://ultimateqa.com/sample-application-lifecycle-sprint-2/');
        cy.get('form').then(forms => {
            cy.wrap(forms).find('[name="firstname"]').type('Michael');
            cy.wrap(forms).find('[name="lastname"]').type('Smith');
            cy.wrap(forms).find('[type="submit"]').click();
        })
    })

    it('sprint 3', () => {
        cy.visit('https://ultimateqa.com/sample-application-lifecycle-sprint-3/');
        cy.get('form').then(forms => {
            cy.wrap(forms).find('input').then(inputs => {
                cy.wrap(inputs).eq(1).click();
                cy.wrap(inputs).eq(1).should('be.checked');
                cy.wrap(inputs).eq(3).type('Selena');
                cy.wrap(inputs).eq(3).should('have.value', 'Selena')
                cy.wrap(inputs).eq(4).type('Pedros');
                cy.wrap(inputs).eq(4).should('have.value', 'Pedros')
            })
            cy.wrap(forms).find('[type="submit"]').click();
        })
    })

    it.only('sprint 5', () => {
        cy.visit('https://ultimateqa.com/sample-application-lifecycle-sprint-5/')
        
        cy.get('form input').each((formList, index) => {
            if(index < 3 || (index > 4 && index < 8)){
                cy.wrap(formList).click().should('be.checked');
            } else if(index === 3 || index === 8) {
                cy.wrap(formList).type('Selena').should('have.value', 'Selena');
            } else if(index === 4 || index === 9) {
                cy.wrap(formList).type('Smith').should('have.value', 'Smith');
            } else {
                cy.wrap(formList).click();
            }
        })
        cy.get('form input').each((formList, index) => {
            if(index < 3){
                cy.wrap(formList).click().should('be.checked');
            } else if(index === 3){
                cy.wrap(formList).click();
            } else {
                return false;
            }
        })
    })
})