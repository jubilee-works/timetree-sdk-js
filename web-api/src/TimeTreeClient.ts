import { APIClient } from "./api";

import {
  Calendar,
  Label,
  Member,
  Event,
  User,
  Activity,
  EventForm,
  ActivityForm
} from "./types";
import { RetryOptions } from "ky";

type TimeTreeClientOptions = {
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
  readonly retry?: RetryOptions | number;
  beforeRetry?: (error: Error, retryCount: number) => Promise<void>
};

type IncludeOptions = readonly ("labels" | "members")[];

type GetUpcomingEventsParams = {
  readonly timezone: string;
  readonly calendarId: string;
  /** The number of days to get. A range from 1 to 7 can be specified */
  readonly days?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly include?: IncludeOptions;
};

type GetEventParams = {
  readonly calendarId: string;
  readonly eventId: string;
  readonly include?: IncludeOptions;
};

type DeleteEventParams = {
  readonly calendarId: string;
  readonly eventId: string;
};

export class TimeTreeClient {
  private readonly api: APIClient;

  constructor(accessToken: string, options: TimeTreeClientOptions = {}) {
    this.api = new APIClient({
      prefixUrl: options.baseURL || "https://timetreeapis.com",
      headers: {
        Accept: "application/vnd.timetree.v1+json",
        Authorization: `Bearer ${accessToken}`
      },
      hooks: {
        beforeRetry:  [async (_request,_options, error, retryCount) => {
          return options.beforeRetry && options.beforeRetry(error,retryCount);
        }]
      },
      ...options
    });
  }

  public getUser() {
    return this.api.get<User>("user");
  }

  public getCalendars(include?: IncludeOptions) {
    return this.api.get<readonly Calendar[]>("calendars", {
      searchParams: include && {
        include: include.join(",")
      }
    });
  }

  public async getCalendar(calendarId: string, include?: IncludeOptions) {
    return this.api.get<Calendar>(`calendars/${calendarId}`, {
      searchParams: include && {
        include: include.join(",")
      }
    });
  }

  public async getLabels(calendarId: string) {
    return await this.api.get<readonly Label[]>(
      `calendars/${calendarId}/labels`
    );
  }

  public async getMembers(calendarId: string) {
    return this.api.get<readonly Member[]>(`calendars/${calendarId}/members`);
  }

  public async getUpcomingEvents({
    calendarId,
    timezone,
    days,
    include
  }: GetUpcomingEventsParams) {
    return this.api.get<readonly Event[]>(
      `calendars/${calendarId}/upcoming_events`,
      {
        searchParams: {
          timezone,
          days,
          include: include && include.join(",")
        }
      }
    );
  }

  public async getEvent({ eventId, calendarId, include }: GetEventParams) {
    return this.api.get<Event>(`calendars/${calendarId}/events/${eventId}`, {
      searchParams: include && {
        include: include.join(",")
      }
    });
  }

  public async postEvent({ calendarId, ...json }: EventForm) {
    return this.api.post<Event>(`calendars/${calendarId}/events`, json);
  }

  public async putEvent({ calendarId, ...json }: EventForm) {
    return this.api.put<Event>(`calendars/${calendarId}/events`, json);
  }

  public async deleteEvent({ calendarId, eventId }: DeleteEventParams) {
    return this.api.delete(`calendars/${calendarId}/events/${eventId}`);
  }

  public async postActivity({ calendarId, eventId, ...json }: ActivityForm) {
    return this.api.post<Activity>(
      `calendars/${calendarId}/events/${eventId}/activities`,
      json
    );
  }
}
