import axios, { AxiosInstance, AxiosTransformer } from "axios";
import humps from "humps";
import * as jwt from "jsonwebtoken";
import qs from "qs";

const DEFAULT_ACCESS_TOKEN_LIFETIME = 600;

export type CalendarAppAuthenticatorOptions = {
  readonly applicationId: string;
  readonly privateKey: string;
  readonly accessTokenLifetimeInSec?: number;
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
};

export type AccessToken = {
  readonly accessToken: string;
  readonly expireAt: number;
  readonly tokenType: "Bearer";
};

export class CalendarAppAuthenticator {
  readonly api: AxiosInstance;
  private readonly options: CalendarAppAuthenticatorOptions;

  constructor(options: CalendarAppAuthenticatorOptions) {
    this.options = options;
    this.api = axios.create({
      baseURL: options.baseURL || "https://timetreeapis.com",
      timeout: options.timeout,
      paramsSerializer: (params) =>
        qs.stringify(humps.decamelizeKeys(params), { skipNulls: true }),
      /* eslint-disable functional/prefer-readonly-type */
      transformResponse: [
        ...[axios.defaults.transformResponse].flat(),
        (data) => humps.camelizeKeys(data),
      ] as AxiosTransformer[],
      transformRequest: [
        (data) => humps.decamelizeKeys(data),
        ...[axios.defaults.transformRequest].flat(),
      ] as AxiosTransformer[],
      /* eslint-enable functional/prefer-readonly-type */
    });
  }

  public async getAccessToken(installationId: string) {
    const response = await this.api.post<AccessToken>(
      `/installations/${installationId}/access_tokens`,
      null,
      {
        headers: {
          Authorization: `Bearer ${this.generateToken()}`,
        },
      }
    );
    return response.data;
  }

  private generateToken() {
    const now = Math.floor(new Date().getTime() / 1000);
    const payload = {
      iat: now,
      exp:
        now +
        (this.options.accessTokenLifetimeInSec ||
          DEFAULT_ACCESS_TOKEN_LIFETIME),
      iss: this.options.applicationId,
    };
    return jwt.sign(payload, this.options.privateKey, { algorithm: "RS256" });
  }
}
