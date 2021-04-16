describe('store-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary'));

  it('should show the title', () => {
    cy.get('h6').contains('Board Game Hoard');
  });
});
