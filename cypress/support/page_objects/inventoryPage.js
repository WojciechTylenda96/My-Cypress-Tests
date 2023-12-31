

export class IventoryPage{

    /**
     * Reset status of website, if we relogin without that function, cart won't reset
     */
    resetAppStatus(){
        cy.get('[id="react-burger-menu-btn"]').click();
        cy.get('[class="bm-item-list"]').find('a[id="reset_sidebar_link"]').click();
    }

    /**
     * Adding item to cart while we are at Home Page
     * @param {*} index - value 0-5
     */
    addItemToCartFromHomePageByIndex(index){
        cy.get('.inventory_list button').eq(index).as('btn');
        cy.get('@btn').should('contain', 'Add to cart')
        cy.get('@btn').click();
        cy.get('@btn').should('contain', 'Remove')
    }

    /**
     * Adding item to cart while we are at Product Detail Page
     */
    addItemToCartFromProductDetailPage(){
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