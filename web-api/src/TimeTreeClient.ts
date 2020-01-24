import axios, { AxiosInstance } from "axios";
import {
  CalendarsResult as Calendars,
  CalendarResult as Calendar,
  LabelsResult,
  MembersResult
} from "~/types/Calendars";
import { EventsResult as Events } from "~/types/Events";

type TimeTreeClientOptions = {
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
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

  public getCalendars(include?: IncludeOptions) {
    return this.axios.get<Calendars>("/calendars", {
      params: {
        include: include && include.join(",")
      }
    });
  }

  public getCalendar(calendarId: string, include?: IncludeOptions) {
    return this.axios.get<Calendar>(`/calendars/${calendarId}`, {
      params: {
        include: include && include.join(",")
      }
    });
  }

  public getLabels(calendarId: string) {
    return this.axios.get<LabelsResult>(`/calendars/${calendarId}/labels`);
  }

  public getMembers(calendarId: string) {
    return this.axios.get<MembersResult>(`/calendars/${calendarId}/members`);
  }

  public getUpcomingEvents({
    calendarId,
    timezone,
    days,
    include
  }: GetUpcomingEventsParams) {
    return this.axios.get<Events>(`calendars/${calendarId}/upcoming_events`, {
      params: {
        timezone,
        days,
        include: include && include.join(",")
      }
    });
  }

  public getEvent({ eventId, calendarId, include }: GetEventParams) {
    return this.axios.get<Events>(`calendars/${calendarId}/events/${eventId}`, {
      params: {
        include: include && include.join(",")
      }
    });
  }
}
