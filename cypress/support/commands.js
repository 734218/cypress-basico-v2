Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Iasmin')
    cy.get('#lastName').type('Sanches')
    cy.get('#email').type('iasmin.sanches@outlook.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})




