import axios, { AxiosInstance } from "axios";
import { Calendars } from "~/types/Calendars";
import { UpcomingEvents } from "~/types/UpcomingEvents";

type TimeTreeClientOptions = {
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
};

type GetUpcomingEventsParams = {
  readonly timezone: string;
  readonly calendarId: string;
  /** The number of days to get. A range from 1 to 7 can be specified */
  readonly days?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
};

export class TimeTreeClient {
  private readonly axios: AxiosInstance;

  constructor(accessToken: string, options: TimeTreeClientOptions = {}) {
    this.axios = axios.create({
      baseURL: options.baseURL || "https://timetreeapis.com/",
      headers: {
        Accept: "application/vnd.timetree.v1+json",
        Authorization: `Bearer ${accessToken}`
      },
      timeout: options.timeout
    });
  }

  public getCalendars() {
    return this.axios.get<Calendars>("/calendars");
  }

  public getUpcomingEvents({
    calendarId,
    timezone,
    days
  }: GetUpcomingEventsParams) {
    return this.axios.get<UpcomingEvents>(
      `calendars/${calendarId}/upcoming_events`,
      {
        params: {
          timezone,
          days
        }
      }
    );
  }
}
