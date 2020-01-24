import axios, { AxiosInstance } from "axios";
import {
  CalendarsResult as Calendars,
  CalendarResult as Calendar,
  LabelsResult,
  MembersResult
} from "~/types/Calendars";
import { EventsResult as Events, EventResult as Event } from "~/types/Events";
import { EventForm } from "~/types/EventForm";
import { User } from "~/types/User";
import { EventActivityForm } from "./types/EventActivityForm";
import { EventActivityResult as EventActivity } from "./types/EventActivities";

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

type DeleteEventParams = {
  readonly calendarId: string;
  readonly eventId: string;
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

  public getUser() {
    return this.axios.get<User>("/user");
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
    return this.axios.get<Event>(`calendars/${calendarId}/events/${eventId}`, {
      params: {
        include: include && include.join(",")
      }
    });
  }

  public postEvent({ calendarId, ...event }: EventForm) {
    return this.axios.post<Event>(`calendars/${calendarId}/events`, event, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public putEvent({ calendarId, ...event }: EventForm) {
    return this.axios.put<Event>(`calendars/${calendarId}/events`, event, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public deleteEvent({ calendarId, eventId }: DeleteEventParams) {
    return this.axios.delete<{}>(`calendars/${calendarId}/events/${eventId}`);
  }

  public postEventActivity({
    calendarId,
    eventId,
    ...activity
  }: EventActivityForm) {
    return this.axios.post<EventActivity>(
      `calendars/${calendarId}/events/${eventId}/activities`,
      activity,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
