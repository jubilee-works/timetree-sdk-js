import ky from "ky-universal";
import humps from "humps";
import { deserialise, serialise, camel } from "kitsu-core";
import plural from "pluralize";
import { Options } from "ky";
import { Overwrite } from "utility-types";
import { ErrorResponse } from "./types";

type Ky = typeof ky;

type APIOptions = Overwrite<
  Options,
  {
    readonly searchParams?: Record<string, string | number | undefined>;
  }
>;

const normalizeResponse = (data: object) => {
  // when data does not have "include", "deserialise" does not work.
  const newData = data?.hasOwnProperty("included")
    ? data
    : { ...data, included: [] };
  return deserialise(humps.camelizeKeys(newData));
};

const normalizeRequest = (data: object) => {
  const newData = humps.decamelizeKeys(data);

  // does not need type property for POST body
  const serialisedData = serialise.apply({ camel, plural }, ["", newData]);
  // eslint-disable-next-line functional/immutable-data
  delete serialisedData.data.type;
  return serialisedData;
};

const normalizeSearchParams = (
  params?: Record<string, string | number | undefined>
) => {
  if (!params) return;
  const decamelized = humps.decamelizeKeys(params);
  const validParams = Object.entries(decamelized).reduce<
    Record<string, string>
  >(
    (accum, [key, value]) =>
      value
        ? {
            ...accum,
            [key]: `${value}`
          }
        : accum,
    {}
  );
  return new URLSearchParams(validParams);
};

export class TimeTreeHTTPError extends ky.HTTPError {
  readonly data: ErrorResponse;

  constructor(response: Response, data: object) {
    super(response);
    this.data = data && normalizeResponse(data).data;
  }
}

const handleHTTPError = async (error: unknown) => {
  if (error instanceof ky.HTTPError) {
    const parsed = await error.response.json().catch(() => null);
    throw new TimeTreeHTTPError(error.response, parsed);
  }
  throw error;
};

export class APIClient {
  private readonly api: Ky;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor({ searchParams, ...options }: APIOptions = {}) {
    this.api = ky.extend(options);
  }

  public async get<Response>(
    url: string,
    options?: APIOptions
  ): Promise<Response> {
    try {
      const searchParams = normalizeSearchParams(options?.searchParams);
      const response: object = await this.api
        .get(url, {
          ...options,
          searchParams
        })
        .json();
      return normalizeResponse(response)?.data;
    } catch (e) {
      return handleHTTPError(e);
    }
  }

  public async post<Response>(
    url: string,
    json: object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { searchParams, ...options }: APIOptions = {}
  ): Promise<Response> {
    try {
      const response: object = await this.api
        .post(url, {
          ...options,
          headers: {
            ...options?.headers,
            "Content-Type": "application/json"
          },
          json: normalizeRequest(json)
        })
        .json();

      if (!response) return response;
      return normalizeResponse(response).data;
    } catch (e) {
      return handleHTTPError(e);
    }
  }

  public async put<Response>(
    url: string,
    json: object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { searchParams, ...options }: APIOptions = {}
  ): Promise<Response> {
    try {
      const response: object = await this.api
        .put(url, {
          ...options,
          headers: {
            ...options?.headers,
            "Content-Type": "application/json"
          },
          json: normalizeRequest(json)
        })
        .json();
      return normalizeResponse(response)?.data;
    } catch (e) {
      return handleHTTPError(e);
    }
  }

  public async delete(url: string, options?: Options) {
    try {
      return this.api.delete(url, options);
    } catch (e) {
      return handleHTTPError(e);
    }
  }
}
