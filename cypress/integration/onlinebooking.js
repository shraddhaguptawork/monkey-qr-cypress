const path = require('path')
context('', () => {
    describe('Online Booking test',()=>{

        it('should Should be able to succesfully book appointment',()=> {
    
            //verify url loaded
            cy.visit('https://visa.vfsglobal.com/ind/en/nld/login/',{ timeout: 10000 })
            cy.url().should('include','visa.vfsglobal.com')

            //Enter Username
            cy.get('input#mat-input-0')
            .type('manojdotwork@gmail.com')

            //Enter Password
            cy.get('input#mat-input-1')
            .type('****')
           
            //Submit
            cy.get('button[class=mat-button-wrapper]')
                .click()
        })
    })
})