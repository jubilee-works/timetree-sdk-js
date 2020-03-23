/* eslint-disable @typescript-eslint/camelcase */
import { Authenticator } from "../Authenticator";
import nock from "nock";

describe("Authenticator", () => {
  describe("authorize", () => {
    const authenticator = new Authenticator();
    const testClientId = "test-client-id";
    const testCsrfToken = "test-csrf-token";
    const testRedirectUri = "test-redirect-uri";

    beforeEach(() => {
      nock("https://timetreeapp.com/oauth")
        .get(`/authorize`)
        .query({
          client_id: testClientId,
          redirect_uri: testRedirectUri,
          response_type: "code",
          state: testCsrfToken,
        })
        .reply(200);
    });

    it("should request to https://timetreeapp.com/oauth/authorize", async () => {
      await expect(
        authenticator.authorize({
          clientId: testClientId,
          redirectUri: "test-redirect-uri",
          state: testCsrfToken,
        })
      ).resolves.toBeDefined();
    });
  });

  describe("getToken", () => {
    const authenticator = new Authenticator();
    const testBody = {
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      redirectUri: "test-redirect-uri",
      code: "test-code",
      grantType: "test-grant-type",
    };

    beforeEach(() => {
      nock("https://timetreeapp.com/oauth")
        .post("/token", {
          client_id: testBody.clientId,
          client_secret: testBody.clientSecret,
          redirect_uri: testBody.redirectUri,
          code: testBody.code,
          grant_type: testBody.grantType,
        })
        .reply(200, { access_token: "test", token_type: "Bearer" });
    });

    it("should post to https://timetreeapp.com/oauth/token", async () => {
      const response = await authenticator.getToken(testBody);
      expect(response).toEqual({
        accessToken: "test",
        tokenType: "Bearer",
      });
    });
  });
});
