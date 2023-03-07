/// <reference types="Cypress" />

//const { sample } = require("cypress/types/lodash")

//const { should } = require("chai")

describe('Central de Atendimento ao Cliente TAT', function() {
//BeforeEach - pode ser usado para pré condição do teste
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })
        it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })
//only pode ser usado somente para executar o teste que queremos sem executar todos os outros.

        it('preenche os campos obrigatorios e envia o formulario', function() {
            const longText = 'Teste.teste,teste,teste.teste,teste,teste.teste,teste,teste.teste,testeteste.teste,testeteste.teste,testeteste.teste,teste'
            
            cy.get('#firstName').type('Iasmin')
            cy.get('#lastName').type('Sanches')
            cy.get('#email').type('iasmin.sanches@outlook.com')
            cy.get('#open-text-area').type(longText, {delay:0})
            cy.contains('button', 'Enviar').click()

            cy.get('.success').should('be.visible')
    })   
        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
           cy.get('#firstName').type('Iasmin')
           cy.get('#lastName').type('Sanches')
           cy.get('#email').type('iasmin.sanches@outlook....com')
           cy.get('#open-text-area').type('teste')
           cy.contains('button', 'Enviar').click()

           cy.get('.error').should('be.visible')
    })
        it('Campo telefone contonua vazio quando preenchido com valor não numérico', function () {
           cy.get('#phone')
            .type('abcdef')
            .should('have.value' , '')

        })   
        it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', function () {
            cy.get('#firstName').type('Iasmin')
            cy.get('#lastName').type('Sanches')
            cy.get('#email').type('iasmin.sanches@outlook.com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('teste')
            cy.contains('button', 'Enviar').click()
 
            cy.get('.error').should('be.visible')
        })
        it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
            cy.get('#firstName')
              .type('Iasmin')
              .should('have.value', 'Iasmin')
              .clear()
              .should('have.value', '')
              cy.get('#lastName')
              .type('Sanches')
              .should('have.value', 'Sanches')
              .clear()
              .should('have.value', '')
        })
        
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
           cy.fillMandatoryFieldsAndSubmit()
           cy.get('.success').should('be.visible')
        })
//seleção suspensa - opções pra escolher em texto - campo produto

       it('seleciona um produto (YouTube) por seu texto', function () {
          cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
       })

       it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')


       })

       it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
       })
//marcando imputs do tipo radio - campo tipo de atendimento

       it('marca o tipo de atendimento "Feedback', function () {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('be.checked')
       })

       it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')

    })
})

        it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
})
//Simula selecionando arquivo pelo botão Choose
       it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input) {
           expect($input[0].files[0].name).to.equal('example.json')

          })
        })         
//Simula como se tivesse arrastando arquivo do desktop 
        it('seleciona um arquivo simulando um drag-and-drop', function () {
         cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input) {
           expect($input[0].files[0].name).to.equal('example.json') 

          })
 //Simula seleção de arquivo sem precisar digitar o caminho         
        })
        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
             expect($input[0].files[0].name).to.equal('example.json') 

          })

        })
 //Link que abre em outra aba       
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
           cy.get('#privacy a').should('have.attr', 'target', '_blank')
       
       })
       it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
            cy.get('#privacy a')
              .invoke('removeAttr','target')
              .click()
              

              cy.contains('Talking About Testing').should ('be.visible')


    })

})