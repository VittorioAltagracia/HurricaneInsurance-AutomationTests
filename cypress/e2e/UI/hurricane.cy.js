import { baseUrl } from "../../utils/baseUrl";
import { CheckInputIsValid } from "../../support/commands";
describe("it tests hurricane insurance app", () => {
  beforeEach("it navigates to the url before each test", () => {
    cy.visit(baseUrl);
  });

  const validZipcode = 34343;

  it("checks that the site is up and goes through the workflow; no water body near", () => {
    cy.url().should("eq", baseUrl);
    cy.contains("Hurricane Insurance").should("be.visible");

    // finds zip code fields and asserts there is no error message displayed by default
    CheckInputIsValid();
    cy.get('[name="postalCode"]').type(validZipcode);
    // asserts that there is no error message displayed after inputting valid zipcode
    CheckInputIsValid();

    cy.ClickButton("Get a quote");
    // building material page
    cy.url().should("eq", `${baseUrl}building-material`);
    cy.contains(
      "h1",
      "What type of material is your home constructed with?"
    ).should("be.visible");
    cy.get('[role="radiogroup"]').children().should("have.length", 3);

    // finds last radio button and checks it
    // asserts that the radio button is not checked
    cy.get('[aria-disabled="false"]')
      .last()
      .should("not.have.class", "Mui-checked");
    // finds the last radio button checks it and confirms radio btn has a value of Bricks
    cy.get('[type="radio"]')
      .last()
      .check()
      .should("have.attr", "value")
      .and("equal", "bricks");

    // asserts that the radio btn is now checked
    cy.get('[aria-disabled="false"]')
      .last()
      .should("have.class", "Mui-checked");

    cy.ClickButton("Next");

    // water proximity page
    cy.url().should("eq", `${baseUrl}water-proximity`);

    cy.contains(
      "h1",
      "Is your home located within 1 mile of a body of water?"
    ).should("be.visible");

    cy.get('[role="radiogroup"]').children().should("have.length", 2);
    cy.get('[aria-disabled="false"]')
      .last()
      .should("not.have.class", "Mui-checked");

    // finds the YES radio button and checks it
    cy.get('[type="radio"]')
      .first()
      .check()
      .should("have.attr", "value")
      .and("equal", "true");

    // asserts that the radio btn is now checked
    cy.get('[aria-disabled="false"]')
      .first()
      .should("have.class", "Mui-checked");

    cy.ClickButton("Next");
    cy.url().should("eq", `${baseUrl}quote`);

    cy.contains("h1", "Your available plans").should("be.visible");
  });
});
