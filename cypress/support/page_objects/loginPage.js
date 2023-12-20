
export class LoginPage{

    logIn(username, password){
        cy.visit('https://www.saucedemo.com/');
        cy.get('[placeholder="Username"]').type(username);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('[name="login-button"]').click();
    }

    verifyLogIn(param){
        cy.visit('https://www.saucedemo.com/');
        if(param) {
            cy.get(`[placeholder="${param}"]`).type(param);
        }
        cy.get('form').then(form => {
            cy.wrap(form).contains('Login').click();
            cy.wrap(form).find('[data-test="error"]').then(message => {
                if(param === 'Username'){
                    cy.wrap(message).should('contain', `Epic sadface: Password is required`);
                } else {
                    cy.wrap(message).should('contain', `Epic sadface: Username is required`);
                }
            })
        })
    }
};

export const onLoginPage = new LoginPage();