// custom cypress commands
export function CheckInputIsValid() {
  cy.get('[name="postalCode"]')
    .should("have.attr", "aria-invalid")
    .and("equal", "false");
}

Cypress.Commands.add("ClickButton", (text) => {
  cy.get(".MuiButton-label").should("have.text", `${text}`).click();
});
