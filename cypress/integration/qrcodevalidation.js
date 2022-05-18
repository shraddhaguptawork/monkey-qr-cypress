//  const { should } = require("chai")
const path = require('path')
context('', () => {
    describe('Smoke to cover QR code validation : Positive scenarios',()=>{

        it('should create and download QR code with URL as content type',()=> {
            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/custom')
                .as('createQR')

            cy.on('uncaught:exception', (err, runnable) => {
                   // returning false here prevents Cypress from failing the test
                   return false
            })
    
            //verify url loaded
            cy.visit('https://www.qrcode-monkey.com/',{ timeout: 10000 })
            cy.url().should('include','qrcode-monkey.com')

            //Enter URL as content for QR
            cy.get('input#qrcodeUrl')
            .clear()
            .type('https://github.com/shraddhaguptawork/cypress_automation')
           
            // Generate QR Code
            cy.get('button#button-create-qr-code')
                .click()
    
            // //validate 'Create QR Code'  button should be unabled
            cy.get('button#button-create-qr-code')
                .should('not.be.enabled')

            cy.log('QR code loading with image')
            cy.wait('@createQR', { timeout: 10_000 })

            // download QR generated
            cy.get('button#button-download-qr-code-png')
              .click()
            cy.get('div.download-status').should('contain.text','Your QR Code is being Generated. Please do not refresh or close')
            
        })

        it('should be able to set color gradiant as "Radial" and download QR code',()=>{
            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/custom')
                    .as('createQR')
    
            cy.on('uncaught:exception', (err, runnable) => {
                       // returning false here prevents Cypress from failing the test
                    return false
            })
    
            //verify url loaded
            cy.visit('https://www.qrcode-monkey.com/',{timeout:10000})
            cy.url().should('include','qrcode-monkey.com')
    
            //Open Set color Panal
           cy.get('*[class^="pane-header"]').contains('Set Colors').click()
           cy.get('[type="radio"]').check('gradient').should('be.checked')
    
            //Select first color
           cy.get('input[ng-attr-id="{{AngularColorPickerController.options.id}}"]')
                .eq(1)
                .clear()
                .type('#C03333')
                .type('{esc}')
                .should('have.value','#C03333')
    
            // //Select second color
            cy.get('input[ng-attr-id="{{AngularColorPickerController.options.id}}"]')
                .eq(2)
                .clear()
                .type('#0D6295')
                .type('{esc}').
                should('have.value','#0D6295')
                
            //select radiant type
            cy.get('select[ng-model="qrcode.config.gradientType"]')
                .select('Radial Gradient')
                .should('have.value','radial')
    
            // Generate QR Code
            cy.get('button#button-create-qr-code')
                .click()
    
            // //validate 'Create QR Code'  button should be unabled
            cy.get('button#button-create-qr-code')
                .should('not.be.enabled')
    
            cy.log('QR code loading with image')
            cy.wait('@createQR', { timeout: 10_000 })
    
            // download QR generated
            cy.get('button#button-download-qr-code-png')
                .click()
            cy.get('div.download-status')
                .should('contain.text','Your QR Code is being Generated. Please do not refresh or close')
    
        })

        it('should be able to upload image and download QR code',()=>{

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
                .attachFile('demo.png')
    
            cy.wait('@uploadImage', { timeout: 10_000 })
            cy.log('image uploaded')
    
            // Generate QR Code
            cy.get('button#button-create-qr-code')
                .click()
    
            //validate 'Create QR Code'  button should be unabled
             cy.get('button#button-create-qr-code')
               .should('not.be.enabled')
    
            cy.log('QR code loading with image')
            cy.wait('@createQR', { timeout: 10_000 })
    
           // download QR generated
            cy.get('button#button-download-qr-code-png')
             .click()
            cy.get('div.download-status').should('contain.text','Your QR Code is being Generated. Please do not refresh or close')
        })

        it('should be able to customize design pattern and download QR code',()=>{
            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/custom')
                    .as('createQR')
    
            cy.on('uncaught:exception', (err, runnable) => {
                       // returning false here prevents Cypress from failing the test
                    return false
            })
    
            //verify url loaded
            cy.visit('https://www.qrcode-monkey.com/',{timeout:10000})
            cy.url().should('include','qrcode-monkey.com')
    
            //Open Set color Panal
           cy.get('*[class^="pane-header"]').contains('Customize Design').click()
          
           //select Body shape for QR
            cy.get('i[class="sprite sprite-body sprite-mosaic"]').click()
    
            //select Eye Frame Shape for QR
            cy.get('i[class="sprite sprite-frame1"]').click()
    
            //select Eye Ball Shape for QR
            cy.get('i[class="sprite sprite-ball1"]').click()
    
            // Generate QR Code
            cy.get('button#button-create-qr-code')
                .click()
    
            //validate 'Create QR Code'  button should be unabled
             cy.get('button#button-create-qr-code')
               .should('not.be.enabled')
    
            cy.log('QR code loading with image')
            cy.wait('@createQR', { timeout: 10_000 })
    
           // download QR generated
            cy.get('button#button-download-qr-code-png')
             .click()
            cy.get('div.download-status').should('contain.text','Your QR Code is being Generated. Please do not refresh or close')
            
    
        })
    })
})