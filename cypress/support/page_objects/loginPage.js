
export class LoginPage{

    logIn(username, password){
        cy.visit('https://www.saucedemo.com/');
        cy.get('[placeholder="Username"]').type(username);
        cy.get('[placeholder="Password"]').type(password);
        cy.get('[name="login-button"]').click();
    }

};

export const onLoginPage = new LoginPage();