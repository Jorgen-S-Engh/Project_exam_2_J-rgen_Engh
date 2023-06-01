describe("Login", () => {
  it("should login a user", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("._input_dczgp_34").first().type("greg@stud.noroff.no");
    cy.get("._input_dczgp_34").last().type("12345greg");

    cy.get("._btn_submit_dczgp_55").first().click();
    cy.url().should("include", "/");
    cy.contains("Featured Venues");
  });
});
