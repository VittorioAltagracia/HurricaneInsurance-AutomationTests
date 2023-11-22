import { baseUrl } from "../../utils/baseUrl";
import { validZipcode } from "../../utils/zipCodes";
import { invalidZipcodes } from "../../utils/zipCodes";

describe("it tests hurricane insurance app", () => {
  beforeEach("it navigates to the url before each test", () => {
    cy.visit(baseUrl);
  });

  // first scenario end-to-end, covers multiple test cases
  it("Tests checkbox with the label Flood Protection Included within the Complete plan, is enabled and unchecked and goes through the workflow; with water body near", () => {
    // usign custom cypress commands to improve code readability and effiency
    cy.VerifyUrl();
    cy.IsTextVisible("Hurricane Insurance");

    // finds zip code fields and asserts there is no error message displayed by default
    cy.ChecksInputIsValid();
    cy.get('[name="postalCode"]').type(validZipcode);
    // asserts that there is no error message displayed after inputting valid zipcode
    cy.ChecksInputIsValid();

    cy.ClickButton("Get a quote");
    // building material page
    cy.VerifyUrl("building-material");

    cy.IsTextVisible("What type of material is your home constructed with?");

    cy.get('[role="radiogroup"]').children().should("have.length", 3);

    // finds last radio button which is equal to bricks and checks it
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
    cy.VerifyUrl("water-proximity");

    cy.IsTextVisible("Is your home located within 1 mile of a body of water?");

    cy.get('[role="radiogroup"]').children().should("have.length", 2);
    cy.get('[aria-disabled="false"]')
      .last()
      .should("not.have.class", "Mui-checked");

    // finds the YES radio button and checks it
    cy.get('[type="radio"]')
      .last()
      .check()
      .should("have.attr", "value")
      .and("equal", "false");

    // asserts that the radio btn is now checked
    cy.get('[aria-disabled="false"]')
      .last()
      .should("have.class", "Mui-checked");

    cy.ClickButton("Next");

    cy.VerifyUrl("quote");
    cy.IsTextVisible("Your available plans");
    cy.IsTextVisible("Standard");
    cy.IsTextVisible("Complete");

    // tests that checkbox is not checked
    cy.get('[data-testid="price_FloodProtection"]').should(
      "not.have.attr",
      "Mui-checked"
    );

    // confirms that options for including flood protection is displayed
    // had to use siblings method for cypress to find this element
    cy.get('[data-testid="price_FloodProtection"]')
      .siblings("span")
      .contains("Include Flood Protection (+$490)")
      .should("be.visible");
  });

  // seconds test
  it("Tests submitting blank zip code", () => {
    cy.VerifyUrl();
    cy.ClickButton("Get a quote");
    cy.IsTextVisible("Required");
  });

  // third test that covers 2 manual scenarios
  it("Tests submitting invalid zip codes", () => {
    cy.VerifyUrl();
    cy.ChecksInputIsValid();
    cy.get('[name="postalCode"]').type(invalidZipcodes[0]);
    cy.IsTextVisible("Invalid zip code");

    // deletes previous input and tries with a different invalid zipcode
    cy.get('[name="postalCode"]').clear();
    cy.IsTextVisible("Required");
    cy.get('[name="postalCode"]').type(invalidZipcodes[1]);
    cy.IsTextVisible("Invalid zip code");

    // after clicking on getting a quote confirms that the url didn't change
    cy.ClickButton("Get a quote");
    cy.VerifyUrl();
  });
});
