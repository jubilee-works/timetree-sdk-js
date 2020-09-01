/* eslint-disable functional/prefer-readonly-type */
import * as jwt from "jsonwebtoken";

import axios, { AxiosInstance, AxiosTransformer } from "axios";

import humps from "humps";
import qs from "qs";

export type JwtAuthenticatorOptions = {
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

export class JwtAuthenticator {
  readonly api: AxiosInstance;
  private readonly options: JwtAuthenticatorOptions;

  constructor(options: JwtAuthenticatorOptions) {
    this.options = options;
    this.api = axios.create({
      baseURL: options.baseURL || "https://timetreeapis.com",
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

  public async getAccessToken(installationId: string) {
    const response = await this.api.post<AccessToken>(
      `/installations/${installationId}/access_tokens`,
      { dummy: 0 },
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
      exp: now + (this.options.accessTokenLifetimeInSec || 0),
      iss: this.options.applicationId,
    };
    return jwt.sign(payload, this.options.privateKey, { algorithm: "RS256" });
  }
}
