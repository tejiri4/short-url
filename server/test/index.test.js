import { query, expect, mutate } from "./utils";

// integration testing
describe("Url Mutation", () => {
  it("should get a short url link", async () => {
    const shortUrlMutation = `
      mutation shortenUrl {
        getShortenUrl(url: "https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url")
      }
    `;

    const { data } = await mutate({ mutation: shortUrlMutation });
    expect(data.getShortenUrl).to.be.a("String");
  });

  it("should validate a wrong link", async () => {
    const shortUrlMutation = `
      mutation shortenUrl {
        getShortenUrl(url: "https://stackoverflow")
      }
    `;

    const { data } = await mutate({ mutation: shortUrlMutation });
    expect(data.getShortenUrl).to.eql(null);
  });
});
