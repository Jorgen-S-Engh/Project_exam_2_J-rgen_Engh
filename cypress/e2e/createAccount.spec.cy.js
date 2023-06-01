describe("Create Account", () => {
  const randomEmail = `test${Math.floor(Math.random() * 1000)}@gmail.com`;
  const randomPassword = `password${Math.floor(Math.random() * 1000)}`;

  it("should not allow creating an account with non-noroff email", () => {
    cy.visit("http://localhost:5173/create-account");

    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(randomPassword);
    cy.get("._btn_submit_xxdqp_56").first().click();
    cy.contains("Email must match pattern: example@stud.noroff.no");
  });

  it("should allow creating an account with noroff email", () => {
    const noroffEmail = `test${Math.floor(
      Math.random() * 1000
    )}@stud.noroff.no`;
    const randomeName = `randomeUser${Math.floor(Math.random() * 1000)}`;

    cy.visit("http://localhost:5173/create-account");
    cy.get("input[name=name]").type(randomeName);
    cy.get('input[name="email"]').clear().type(noroffEmail);
    cy.get('input[name="password"]').clear().type(randomPassword);
    cy.get("._btn_submit_xxdqp_56").first().click();

    cy.contains("Account created successfully! Redirecting to login");
  });
});
