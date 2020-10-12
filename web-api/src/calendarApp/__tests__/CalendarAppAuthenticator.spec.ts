import {
  CalendarAppAuthenticator,
  CalendarAppAuthenticatorOptions,
} from "../CalendarAppAuthenticator";
import nock from "nock";
import { accessToken, jwtPrivateKey } from "./fixtures";
import { expectedAccessToken } from "./expectations";

describe("JwtAuthenticator", () => {
  describe("getAccessToken", () => {
    it("should request to /installations/${installationId}/access_tokens", async () => {
      nock("https://timetreeapis.com", {
        reqheaders: { Authorization: /^Bearer .+$/ },
      })
        .post("/installations/123/access_tokens")
        .reply(200, accessToken);
      const options: CalendarAppAuthenticatorOptions = {
        applicationId: "3",
        privateKey: jwtPrivateKey,
      };
      const authenticator = new CalendarAppAuthenticator(options);
      const response = await authenticator.getAccessToken("123");
      expect(response).toEqual(expectedAccessToken);
    });
  });
});
