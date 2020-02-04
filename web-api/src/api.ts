import ky from "ky-universal";
import humps from "humps";
import { deserialise, serialise, camel } from "kitsu-core";
import plural from "pluralize";
import { Options } from "ky";
import { Overwrite } from "utility-types";

type Ky = typeof ky;

type APIOptions = Overwrite<
  Options,
  {
    readonly searchParams?: Record<string, string | number | undefined>;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (value: any): value is object =>
  value
    ?.toString()
    .slice(8, -1)
    .toLowerCase() === "object";

const deserialiseResponse = (data: unknown) => {
  if (!data || !isObject(data)) {
    return data;
  }
  // when data does not have "include", "deserialise" does not work.
  const newData = data?.hasOwnProperty("included")
    ? data
    : { ...data, included: [] };
  return deserialise(newData);
};

const serialiseRequest = (data: unknown) => {
  if (!data || !isObject(data)) {
    return data;
  }

  // does not need type property for POST body
  const serialisedData = serialise.apply({ camel, plural }, ["", data]);
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
    const searchParams = normalizeSearchParams(options?.searchParams);
    const response: object = await this.api
      .get(url, {
        ...options,
        searchParams
      })
      .json();
    return deserialiseResponse(humps.camelizeKeys(response))?.data;
  }

  public async post<Response>(
    url: string,
    json: object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { searchParams, ...options }: APIOptions = {}
  ): Promise<Response> {
    const decamelized = humps.decamelizeKeys(json);
    const response: object = await this.api
      .post(url, {
        ...options,
        headers: {
          ...options?.headers,
          "Content-Type": "application/json"
        },
        json: serialiseRequest(decamelized)
      })
      .json();

    if (!response) return response;
    const decamelizedResponse = humps.camelizeKeys(response);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (!decamelizedResponse.data) return decamelizedResponse;

    return deserialiseResponse(humps.camelizeKeys(response)).data;
  }

  public async put<Response>(
    url: string,
    json: object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { searchParams, ...options }: APIOptions = {}
  ): Promise<Response> {
    const decamelized = humps.decamelizeKeys(json);
    const response: object = await this.api
      .put(url, {
        ...options,
        headers: {
          ...options?.headers,
          "Content-Type": "application/json"
        },
        json: serialiseRequest(decamelized)
      })
      .json();
    return deserialiseResponse(humps.camelizeKeys(response))?.data;
  }

  public async delete(url: string, options?: Options) {
    return this.api.delete(url, options);
  }
}
