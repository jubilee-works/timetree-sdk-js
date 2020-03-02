/* eslint-disable functional/prefer-readonly-type */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from "axios";
import asyncRetroy from "async-retry";
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

export type RetryOptions = {
  readonly retry?: number;
  readonly validateRetryable?: (e: AxiosError) => boolean;
  readonly onRetry?: (e: Error, count: number) => void;
};

export class APIClient {
  private readonly api: AxiosInstance;
  private readonly retryOptions: RetryOptions;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(
    options: AxiosRequestConfig,
    { retry = 0, validateRetryable, onRetry }: RetryOptions = {}
  ) {
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
    this.retryOptions = {
      retry,
      validateRetryable,
      onRetry
    };
  }

  public async get<Response>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const get = this.wrapRequest<[string, AxiosRequestConfig | undefined]>(
      this.api.get
    );
    const response = await get<object>(url, {
      ...options
    });
    return normalizeResponse(response?.data)?.data;
  }

  public async post<Response>(
    url: string,
    json: object,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const post = this.wrapRequest<
      [string, object, AxiosRequestConfig | undefined]
    >(this.api.post);
    const response = await post<object>(url, normalizeRequest(json), {
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
    const put = this.wrapRequest<
      [string, object, AxiosRequestConfig | undefined]
    >(this.api.put);
    const response = await put<object>(url, normalizeRequest(json), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json"
      }
    });

    return normalizeResponse(response?.data)?.data;
  }

  public async delete(url: string, options?: AxiosRequestConfig) {
    const destroy = this.wrapRequest<[string, AxiosRequestConfig | undefined]>(
      this.api.delete
    );
    return destroy<object>(url, options);
  }

  private wrapRequest<P extends unknown[]>(
    fn: (...params: P) => Promise<AxiosResponse>
  ) {
    const { retry, validateRetryable, onRetry } = this.retryOptions;
    const retryableStatusCodes = [408, 413, 429, 500, 502, 503, 504];

    return <T>(...params: P) =>
      asyncRetroy<AxiosResponse<T> | undefined>(
        async bail => {
          try {
            const result = await fn(...params);
            return result;
          } catch (e) {
            if (
              !retryableStatusCodes.includes(e.response?.status) &&
              validateRetryable &&
              !validateRetryable(e)
            ) {
              bail(e);
              return;
            }
            throw e;
          }
        },
        {
          retries: retry,
          onRetry
        }
      );
  }
}
