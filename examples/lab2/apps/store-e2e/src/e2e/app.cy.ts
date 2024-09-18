describe('store', () => {
  beforeEach(() => cy.visit('/'));

  it('should have 3 games', () => {
    cy.contains('Settlers in the Can');
    cy.contains('Chess Pie');
    cy.contains('Purrfection');
  });
});
