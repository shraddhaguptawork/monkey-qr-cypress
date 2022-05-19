README

    Created smoke testcases to cover the basic funtionlity of QR Code Monkey website using Cypress tool. Covered 5 postive test and 2 negative test sceanios.

WEBSITE

    Visit the website to reference https://www.qrcode-monkey.com/


GIT

    To download the latest source of the GIT server , do this:
    git clone git@github.com:shraddhaguptawork/monkey-qr-cypress.git

COMMANDS

    To run all the test- npm run cy:run
    To open cypress- npm run cy:open

TESTCASES DESC

    1. should create and download QR code with URL as content type
    2. should be able to set color gradiant as "Radial" and download QR code
    3. should be able to upload image and download QR code
    4. should be able to customize design pattern and download QR code
    5. should not be able to upload image bigger than 2MB
    6. should give error when content is empty for create QR code
    7. Read QR Image
