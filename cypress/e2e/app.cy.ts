describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/angular-dictionary-app/');
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'Angular Dictionary App');
  });

  it('dark mode works', () => {
    cy.get('.Toggle__display').click();
    cy.get('body').should('have.attr', 'data-theme', 'dark');
    cy.get('.Toggle__display').click();
    cy.get('body').should('have.attr', 'data-theme', 'light');
  })

  it('font select works', () => {
    cy.get('#font').select('Sans-Serif');
    cy.get('body').should('have.class', 'sans-serif');
  })

  it('search for atlas', () => {
    cy.get('.form__input').type('atlas');
    cy.get('.form__button').click();
    cy.url().should('eq', 'http://localhost:4200/angular-dictionary-app/details?word=atlas');
    cy.get('.article-h1').should('contain', 'atlas');
    cy.get('.player-div').should('not.exist');
  })

  it('word not found', () => {
    cy.get('.form__input').type('atlasfsfsd');
    cy.get('.form__button').click();
    cy.url().should('eq', 'http://localhost:4200/angular-dictionary-app/details?word=atlasfsfsd');
    cy.get('.app__error').should('be.visible');
  })

  it('word not found error disappears on correct next search', () => {
    cy.get('.form__input').type('atlasfsfsd');
    cy.get('.form__button').click();
    cy.url().should('eq', 'http://localhost:4200/angular-dictionary-app/details?word=atlasfsfsd');
    cy.get('.app__error').should('be.visible');
    cy.get('.form__input').clear();
    cy.get('.form__input').type('greet');
    cy.get('.form__button').click();
    cy.url().should('eq', 'http://localhost:4200/angular-dictionary-app/details?word=greet');
    cy.get('.article-h1').should('contain', 'greet');
    cy.get('.player-div').should('exist');
    cy.get('.app__error').should('not.exist');
  })

});