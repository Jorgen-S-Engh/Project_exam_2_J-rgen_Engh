describe("Login", () => {
  it("should login a user", () => {
    cy.visit("http://localhost:5173/login");

    cy.get("._input_dczgp_34").first().type("greg@stud.noroff.no");
    cy.get("._input_dczgp_34").last().type("12345greg");

    cy.get("._btn_submit_dczgp_55").first().click();

    // check that we have been redirected to the home page after login
    cy.url().should("include", "/");

    // check that some element or text that only appears when logged in is present
    cy.contains("Featured Venues");
  });
});
