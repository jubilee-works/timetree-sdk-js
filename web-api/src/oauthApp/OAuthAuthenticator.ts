/* eslint-disable functional/prefer-readonly-type */
import axios, { AxiosInstance, AxiosTransformer } from "axios";
import qs from "qs";
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

export class OAuthAuthenticator {
  readonly api: AxiosInstance;

  constructor(options: AuthenticatorOptions = {}) {
    this.api = axios.create({
      baseURL: options.baseURL || "https://timetreeapp.com/oauth",
      timeout: options.timeout,
      paramsSerializer: (params) =>
        qs.stringify(humps.decamelizeKeys(params), { skipNulls: true }),
      transformResponse: [
        ...[axios.defaults.transformResponse].flat(),
        (data) => humps.camelizeKeys(data),
      ] as AxiosTransformer[],
      transformRequest: [
        (data) => humps.decamelizeKeys(data),
        ...[axios.defaults.transformRequest].flat(),
      ] as AxiosTransformer[],
    });
  }

  public async authorize({
    clientId,
    redirectUri,
    state,
    responseType = "code",
    codeChallenge,
    codeChallengeMethod,
  }: AuthorizeParams) {
    const response = await this.api.get("/authorize", {
      params: {
        clientId,
        redirectUri,
        responseType,
        state,
        codeChallenge,
        codeChallengeMethod,
      },
    });
    return { status: response.status, statusText: response.statusText };
  }

  public async getToken(body: GetTokenBody) {
    const response = await this.api.post<GetTokenResponse>("/token", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
}
