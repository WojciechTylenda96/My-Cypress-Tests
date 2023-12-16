
export class NaviagtionPane{

    productDetailsByItemIndex(index) {
        cy.get('.inventory_list .inventory_item_name ').eq(index).click()
    }

    shopCart(){
        cy.get('.shopping_cart_link').click();
    }

};

export const navigateTo = new NaviagtionPane();