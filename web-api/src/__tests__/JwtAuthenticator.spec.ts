import { JwtAuthenticator, JwtAuthenticatorOptions } from "../JwtAuthenticator";
import nock from "nock";
import { accessToken, jwtPrivateKey } from "./fixtures";

describe("JwtAuthenticator", () => {
  describe("getAccessToken", () => {
    it("should request to /installations/${installationId}/access_tokens", async () => {
      nock("https://timetreeapis.com")
        .post("/installations/123/access_tokens")
        .reply(200, accessToken);
      const options: JwtAuthenticatorOptions = {
        applicationId: "3",
        privateKey: jwtPrivateKey,
      };
      const authenticator = new JwtAuthenticator(options);
      await expect(authenticator.getAccessToken("123")).resolves.toBeDefined();
    });
  });
});
