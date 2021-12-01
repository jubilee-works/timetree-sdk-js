/* eslint-disable functional/prefer-readonly-type */
import asyncRetroy from "async-retry";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosTransformer,
} from "axios";
import humps from "humps";
import { camel, deserialise, serialise } from "kitsu-core";
import plural from "pluralize";
import qs from "qs";

const normalizeResponse = (data?: object) => {
  if (!data) return null;
  // when data does not have "include", "deserialise" does not work.
  const newData = Object.prototype.hasOwnProperty.call(data, "included")
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

  constructor(
    options: AxiosRequestConfig,
    { retry = 0, validateRetryable, onRetry }: RetryOptions = {}
  ) {
    this.api = axios.create({
      ...options,
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
      timeout: options.timeout,
    });
    this.retryOptions = {
      retry,
      validateRetryable,
      onRetry,
    };
  }

  public async get<Response>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const get = this.wrapRequest(this.api.get);
    const response = await get(url, {
      ...options,
    });
    return normalizeResponse(response?.data)?.data;
  }

  public async post<Response>(
    url: string,
    json: object,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const post = this.wrapRequest(this.api.post);
    const response = await post(url, normalizeRequest(json), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    });

    return normalizeResponse(response?.data)?.data;
  }

  public async put<Response>(
    url: string,
    json: object,
    options?: AxiosRequestConfig
  ): Promise<Response> {
    const put = this.wrapRequest(this.api.put);
    const response = await put(url, normalizeRequest(json), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    });

    return normalizeResponse(response?.data)?.data;
  }

  public async delete(url: string, options?: AxiosRequestConfig) {
    const destroy = this.wrapRequest(this.api.delete);
    return destroy(url, options);
  }

  private wrapRequest<Request extends (...p: any[]) => Promise<any>>(
    fn: Request
  ) {
    const { retry, validateRetryable, onRetry } = this.retryOptions;
    const retryableStatusCodes = [408, 413, 429, 500, 502, 503, 504];
    type Params = Parameters<Request>;

    return (...params: Params) =>
      asyncRetroy<Promise<AxiosResponse<object>>>(
        async (bail) => {
          try {
            const result = await fn(...params);
            return result;
          } catch (e) {
            if (
              axios.isAxiosError(e) &&
              typeof e.response?.status === "number" &&
              !retryableStatusCodes.includes(e.response?.status) &&
              (!validateRetryable || !validateRetryable(e))
            ) {
              bail(e);
              return;
            }
            throw e;
          }
        },
        {
          retries: retry,
          onRetry,
        }
      );
  }
}
/* eslint-enable functional/prefer-readonly-type */
