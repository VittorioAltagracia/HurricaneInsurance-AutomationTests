// custom cypress commands

import { baseUrl } from "../utils/baseUrl";

Cypress.Commands.add("ChecksInputIsValid", () => {
  cy.get('[name="postalCode"]')
    .should("have.attr", "aria-invalid")
    .and("equal", "false");
});

Cypress.Commands.add("ClickButton", (text) => {
  cy.get(".MuiButton-label").should("have.text", `${text}`).click();
});

Cypress.Commands.add("VerifyUrl", (path = "") => {
  cy.url().should("eq", `${baseUrl}${path}`);
});

Cypress.Commands.add("IsTextVisible", (text) => {
  cy.contains(`${text}`).should("be.visible");
});
