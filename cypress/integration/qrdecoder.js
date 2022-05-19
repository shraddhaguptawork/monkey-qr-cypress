import { Decoder } from '@nuintun/qrcode';
const qrcode = new Decoder();


describe('TESTING QR CODE AUTHENTICATION', () => {
   
        it(' Read QR Image', () => {

            cy.intercept('POST', 'https://api.qrcode-monkey.com//qr/custom')
             .as('createQR')
            cy.on('uncaught:exception', (err, runnable) => {
                // returning false here prevents Cypress from failing the test
                return false
            })
         
            cy.visit('https://www.qrcode-monkey.com/',{ timeout: 10000 })
            cy.url().should('include','qrcode-monkey.com')

        

         qrcode
           .scan('https://www.qrcode-monkey.com/img/default-preview-qr.svg')
           .then(result => {
             console.log(result.data);
           })
           .catch(error => {
             console.error(error);
           });

        qrcode
           .scan('./cypress/fixtures/qrcode.png')
           .then(result2 => {
             console.log(result2.data);
           })
           .catch(error => {
             console.error(error);
           });
           
           //expect(result2.data).to.equal(result.data)
        })
    

        
})