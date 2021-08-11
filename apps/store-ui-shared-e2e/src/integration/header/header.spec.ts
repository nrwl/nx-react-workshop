describe('store-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary'));

  it('should show the title', () => {
    cy.get('header').contains('Board Game Hoard');
  });
});
