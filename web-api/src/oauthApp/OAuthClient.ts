import { APIClient, RetryOptions } from "../api";

import {
  Calendar,
  Label,
  Member,
  Event,
  User,
  Activity,
  EventForm,
  ActivityForm,
} from "../types";

type OAuthClientOptions = {
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
  readonly retry?: RetryOptions["retry"];
  readonly validateRetryable?: RetryOptions["validateRetryable"];
  readonly onRetry?: RetryOptions["onRetry"];
};

type IncludeOptions = {
  readonly labels?: boolean;
  readonly members?: boolean;
};

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
  readonly include?: {
    readonly creator?: boolean;
    readonly label?: boolean;
    readonly attendees?: boolean;
  };
};

type UpdateEventForm = EventForm & {
  readonly eventId: string;
};

type DeleteEventParams = {
  readonly calendarId: string;
  readonly eventId: string;
};

const parseIncludeOptions = (options: Record<string, boolean | undefined>) => {
  return Object.entries(options)
    .reduce<readonly string[]>(
      (accum, [key, value]) => (value ? [...accum, key] : accum),
      []
    )
    .join(",");
};

export class OAuthClient {
  private readonly api: APIClient;

  constructor(
    accessToken: string,
    { retry, onRetry, validateRetryable, ...options }: OAuthClientOptions = {}
  ) {
    this.api = new APIClient(
      {
        baseURL: options.baseURL || "https://timetreeapis.com",
        headers: {
          Accept: "application/vnd.timetree.v1+json",
          Authorization: `Bearer ${accessToken}`,
        },
        ...options,
      },
      {
        retry,
        validateRetryable,
        onRetry,
      }
    );
  }

  public getUser() {
    return this.api.get<User>("/user");
  }

  public getCalendars(include?: IncludeOptions) {
    return this.api.get<readonly Calendar[]>("/calendars", {
      params: include && {
        include: parseIncludeOptions(include),
      },
    });
  }

  public async getCalendar(calendarId: string, include?: IncludeOptions) {
    return this.api.get<Calendar>(`/calendars/${calendarId}`, {
      params: include && {
        include: parseIncludeOptions(include),
      },
    });
  }

  public async getLabels(calendarId: string) {
    return await this.api.get<readonly Label[]>(
      `/calendars/${calendarId}/labels`
    );
  }

  public async getMembers(calendarId: string) {
    return this.api.get<readonly Member[]>(`/calendars/${calendarId}/members`);
  }

  public async getUpcomingEvents({
    calendarId,
    timezone,
    days,
    include,
  }: GetUpcomingEventsParams) {
    return this.api.get<readonly Event[]>(
      `/calendars/${calendarId}/upcoming_events`,
      {
        params: {
          timezone,
          days,
          include: include && parseIncludeOptions(include),
        },
      }
    );
  }

  public async getEvent({ eventId, calendarId, include }: GetEventParams) {
    return this.api.get<Event>(`/calendars/${calendarId}/events/${eventId}`, {
      params: include && {
        include: parseIncludeOptions(include),
      },
    });
  }

  public async createEvent({ calendarId, ...json }: EventForm) {
    return this.api.post<Event>(`/calendars/${calendarId}/events`, json);
  }

  public async updateEvent({ calendarId, eventId, ...json }: UpdateEventForm) {
    return this.api.put<Event>(
      `/calendars/${calendarId}/events/${eventId}`,
      json
    );
  }

  public async deleteEvent({ calendarId, eventId }: DeleteEventParams) {
    return this.api.delete(`/calendars/${calendarId}/events/${eventId}`);
  }

  public async createActivity({ calendarId, eventId, ...json }: ActivityForm) {
    return this.api.post<Activity>(
      `/calendars/${calendarId}/events/${eventId}/activities`,
      json
    );
  }
}
