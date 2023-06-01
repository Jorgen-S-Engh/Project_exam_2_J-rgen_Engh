describe("Create and delete venue", () => {
  const randomName = `testName${Math.floor(Math.random() * 1000)}`;
  const randomNum = Math.floor(Math.random() * 100);

  it("Should log in, create a venue and then delete the same venue", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("._input_dczgp_34").first().type("greg@stud.noroff.no");
    cy.get("._input_dczgp_34").last().type("12345greg");
    cy.get("._btn_submit_dczgp_55").first().click();
    cy.url().should("include", "/");
    cy.wait(3000);
    cy.get("._profile_img_1nqkh_26").click();
    cy.get("._btn_h84bi_72").eq(1).click();

    cy.get('input[name="name"]').type(randomName);
    cy.get('input[name="price"]').type(randomNum);
    cy.get('input[name="maxGuests"]').type(randomNum);
    cy.get("._btn_submit_d9lyf_103").click();
    cy.wait(3000);
    cy.get("._venue_card_h84bi_142").last().click();
    cy.get("._btn_delete_venue_d9lyf_103").click();
    cy.contains("Venue Successfully Deleted");
  });
});
