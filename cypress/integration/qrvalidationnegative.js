const path = require('path')
context('', () => {
    describe('Smoke to cover QR code validation : Negative scenarios',()=>{
        it('should not be able to upload image bigger than 2MB',()=>{

            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/custom')
                 .as('createQR')
    
            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/uploadimage')
                .as('uploadImage')
    
            cy.on('uncaught:exception', (err, runnable) => {
               // returning false here prevents Cypress from failing the test
                return false
            })
            //verify url loaded
            cy.visit('https://www.qrcode-monkey.com/',{timeout:10000})
            cy.url()
                .should('include','qrcode-monkey.com')
    
              // Open Image Upload Pane
            cy.get('.accordion>.pane:nth-child(3)>.pane-header').click()
                
              // Upload Image
            cy.log('uploading image..')
            cy.get('input[type="file"]')
                .attachFile('sample-3mb.png')

            cy.get('small[ng-show="fileSizeError"]').should('contain.text','File is too big. Max. size is 2 MB.')

        })

        it('should give error when content is empty for create QR code',()=> {
            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/custom')
                .as('createQR')

            cy.on('uncaught:exception', (err, runnable) => {
                   // returning false here prevents Cypress from failing the test
                   return false
            })
    
            //verify url loaded
            cy.visit('https://www.qrcode-monkey.com/',{ timeout: 10000 })
            cy.url().should('include','qrcode-monkey.com')

            //Content is empty
            cy.get('input#qrcodeUrl')
            .clear()
           
            // Generate QR Code
            cy.get('button#button-create-qr-code')
                .click()

            cy.get('div[class="alert alert-danger"]').should('contain','There are errors you have to fix before generating.')
        })
    })
})