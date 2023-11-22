import { apiUrl } from "../../utils/baseUrl";

describe("tests the Quote endpoint and asserts it returns a quote", () => {
  context(`POST  ${apiUrl}`, () => {
    it("sends a payload", () => {
      cy.request("POST", `${apiUrl}`, {
        postalCode: "12346",
        buildingMaterial: "bricks",
        waterProximity: "false",
      }).then((res) => {
        const { quote } = res.body;
        const { plans, floodProtection } = quote;

        // assertions
        expect(res.status).to.eq(200);
        expect(quote, "Response should include quote").to.include({
          plans,
          floodProtection,
        });
        expect(plans.standard.price).to.not.be.null;
        expect(plans.complete.price).to.not.be.null;
        expect(floodProtection.price).to.not.be.null;
        expect(
          floodProtection.includedByDefault,
          "Flood protection should not be included by default"
        ).to.be.false;
      });
    });
  });
});
