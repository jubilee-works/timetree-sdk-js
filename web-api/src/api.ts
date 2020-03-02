import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import humps from "humps";
import { deserialise, serialise, camel } from "kitsu-core";
import plural from "pluralize";

const normalizeResponse = (data?: object) => {
  if (!data) return null;
  // when data does not have "include", "deserialise" does not work.
  const newData = data?.hasOwnProperty("included")
    ? data
    : { ...data, included: [] };
  return deserialise(newData);
};

const normalizeRequest = (data: object) => {
  // does not need type property for POST body
  const serialisedData = serialise.apply({ camel, plural }, ["", data]);
  // eslint-disable-next-line functional/immutable-data
  delete serialisedData.data.type;
  return serialisedData;
};

export class APIClient {
  private readonly api: AxiosInstance;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: AxiosRequestConfig) {
    this.api = axios.create({
      ...options,
      paramsSerializer: params =>
        qs.stringify(humps.decamelizeKeys(params), { skipNulls: true }),
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

  public async get<Response>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const response = await this.api.get<object>(url, {
      ...options
    });
    return normalizeResponse(response?.data)?.data;
  }

  public async post<Response>(
    url: string,
    json: object,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const response = await this.api.post<object>(url, normalizeRequest(json), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json"
      }
    });

    return normalizeResponse(response?.data)?.data;
  }

  public async put<Response>(
    url: string,
    json: object,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const response = await this.api.put<object>(url, normalizeRequest(json), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json"
      }
    });

    return normalizeResponse(response?.data)?.data;
  }

  public async delete(url: string, options?: AxiosRequestConfig) {
    return this.api.delete(url, options);
  }
}
