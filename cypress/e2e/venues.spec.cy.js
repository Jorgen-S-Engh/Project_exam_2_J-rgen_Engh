describe("Venues page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:5173/");
  });

  it("displays a headline", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Featured Venues");
  });
});
