
function selectGroupMenuItem(groupMenu){
    cy.contains('a', groupMenu).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if(attr.includes('left')){
                cy.wrap(menu).click();
            }
        })
    })
}

export class NavigationPage {

    stepperPage() {
        selectGroupMenuItem('Layout');
        cy.contains('Stepper').click();
    }

    accordionPage() {
        selectGroupMenuItem('Layout');
        cy.contains('Accordion').click();
    }

    formLayoutsPage() {
        selectGroupMenuItem('Form');
        cy.contains('Form Layouts').click();
    }

    datePickerPage() {
        selectGroupMenuItem('Form');
        cy.contains('Datepicker').click();
    }

    dialogPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Dialog').click();
    }

    windowPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Window').click();
    }

    popoverPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Popover').click();
    }

    toasterPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Toastr').click();
    }

    tooltipPage() {
        selectGroupMenuItem('Modal & Overlays');
        cy.contains('Tooltip').click();
    }

    smartTablePage() {
        selectGroupMenuItem('Tables & Data');
        cy.contains('Smart Table').click();
    }

    
};

export const navigateTo = new NavigationPage();