/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from "axios";
import humps from "humps";
import qs from "qs";

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
  readonly acessToken: string;
  readonly createdAt: number;
  readonly tokenType: string;
};

export class Authenticator {
  readonly axios: AxiosInstance;

  constructor(options: AuthenticatorOptions = {}) {
    this.axios = axios.create({
      baseURL: options.baseURL || "https://timetreeapp.com/oauth",
      paramsSerializer: params => qs.stringify(humps.decamelizeKeys(params)),
      transformResponse: [
        ...[axios.defaults.transformResponse].flat(),
        data => humps.camelizeKeys(data)
      ],
      transformRequest: [
        data => humps.decamelizeKeys(data),
        ...[axios.defaults.transformRequest].flat()
      ],
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
    return this.axios.get("/authorize", {
      params: {
        clientId,
        redirectUri,
        responseType,
        state,
        codeChallenge,
        codeChallengeMethod
      }
    });
  }

  public async getToken(body: GetTokenBody) {
    const response = await this.axios.post<GetTokenResponse>("/token", body);
    return response.data;
  }
}
