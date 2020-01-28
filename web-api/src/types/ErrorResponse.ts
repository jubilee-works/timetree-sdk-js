/** see https://developers.timetreeapp.com/en/docs/api#error-responses */
export type ErrorResponse = {
  readonly type: string;
  readonly status: 400 | 401 | 403 | 404 | 406 | 429;
  readonly title: string;
  readonly errors?: string;
};
