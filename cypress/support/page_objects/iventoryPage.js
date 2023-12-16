import { navigateTo } from "./navigationPage";

export class IventoryPage{

    resetAppStatus(){
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[class="bm-item-list"]').find('a[id="reset_sidebar_link"]').click();
    }

    addItemToCartFromHomePageByIndex(index){
        cy.get('.inventory_list button').eq(index).as('btn');
        cy.get('@btn').should('contain', 'Add to cart')
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove')
    }

    addItemToCartFromProductDetailPageByIndex(index){
        cy.get('.inventory_list .inventory_item_name ').eq(index).click();
        cy.get('button.btn_inventory').as('btn');
        cy.get('@btn').should('contain', 'Add to cart');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove');
    }

    deleteItemAtHomePageByItemIndex(index){
        cy.get('.inventory_list button').eq(index).as('btn');
        cy.get('@btn').click()
        cy.get('@btn').should('contain', 'Add to cart');
    }

    deleteItemAtProductDetailsPage(){
        cy.get('button.btn_inventory').as('btn');
        cy.get('@btn').should('contain', 'Remove');
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Add to cart');
    }

    deleteItemAtShopCart(){
        cy.get('.item_pricebar button').as('btn2');
        cy.get('@btn2').should('contain', 'Remove');
        cy.get('@btn2').click();
    }

    checkIfItemAddedToCart(){
        cy.get('.shopping_cart_badge').should('exist');
        cy.get('.cart_list').find('.cart_item').should('exist');
    }

    checkIfItemDeletedFromCart(){
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('.cart_list').find('.cart_item').should('not.exist')
    }

}

export const onInventoryPage = new IventoryPage();