describe('ui-calendar', () => {
  beforeEach(() => cy.visit('/iframe.html?id=uicalendarcomponent--primary'));

  it('should render the component', () => {
    cy.get('nx-demo-ui-calendar').should('exist');
  });
});
