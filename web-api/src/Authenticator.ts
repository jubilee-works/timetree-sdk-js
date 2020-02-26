/* eslint-disable @typescript-eslint/camelcase */
import ky from "ky-universal";
import humps from "humps";

type AuthenticatorOptions = {
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
};

type AuthorizeParams = {
  readonly clientId: string;
  readonly redirectUri: string;
  readonly responseType?: string;
  readonly state: string;
  readonly codeChallenge?: string;
  readonly codeChallengeMethod?: string;
};

type GetTokenBody = {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectUri: string;
  readonly code: string;
  readonly grantType: string;
  readonly codeVerifier?: string;
};

type GetTokenResponse = {
  readonly accessToken: string;
  readonly createdAt: number;
  readonly tokenType: string;
};

export class Authenticator {
  readonly api: typeof ky;

  constructor(options: AuthenticatorOptions = {}) {
    this.api = ky.extend({
      prefixUrl: options.baseURL || "https://timetreeapp.com/oauth",
      timeout: options.timeout
    });
  }

  public async authorize({
    clientId,
    redirectUri,
    state,
    responseType = "code",
    codeChallenge,
    codeChallengeMethod
  }: AuthorizeParams) {
    const searchParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseType,
      state
    });
    codeChallenge && searchParams.append("code_challenge", codeChallenge);
    codeChallengeMethod &&
      searchParams.append("code_challenge_method", codeChallengeMethod);
    return this.api.get("authorize", {
      searchParams
    });
  }

  public async getToken(body: GetTokenBody) {
    const decamelized = humps.decamelizeKeys(body);
    const response = await this.api
      .post("token", {
        headers: {
          "Content-Type": "application/json"
        },
        json: decamelized
      })
      .json<object>();
    return humps.camelizeKeys(response) as GetTokenResponse;
  }
}
