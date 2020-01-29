import axios, { AxiosInstance } from "axios";
import humps from "humps";
import qs from "qs";
import { deserialise } from "kitsu-core";

import {
  CalendarsResult as Calendars,
  CalendarResult as Calendar,
  LabelsResult,
  MembersResult
} from "./types/Calendars";
import { EventsResult as Events, EventResult as Event } from "./types/Events";
import { EventForm } from "./types/EventForm";
import { User } from "./types/User";
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
      paramsSerializer: params => qs.stringify(humps.decamelizeKeys(params)),
      transformResponse: [
        ...[axios.defaults.transformResponse].flat(),
        data => humps.camelizeKeys(data),
        data => deserialise(data)
      ],
      transformRequest: [
        data => humps.decamelizeKeys(data),
        ...[axios.defaults.transformRequest].flat()
      ],
      timeout: options.timeout
    });
  }

  public async getUser() {
    const response = await this.axios.get<User>("/user");
    return response.data;
  }

  public async getCalendars(include?: IncludeOptions) {
    const { data: calendars } = await this.axios.get<Calendars>("/calendars", {
      params: {
        include: include && include.join(",")
      }
    });
    return calendars.data;
  }

  public async getCalendar(calendarId: string, include?: IncludeOptions) {
    const response = await this.axios.get<Calendar>(
      `/calendars/${calendarId}`,
      {
        params: {
          include: include && include.join(",")
        }
      }
    );
    return response.data;
  }

  public async getLabels(calendarId: string) {
    const response = await this.axios.get<LabelsResult>(
      `/calendars/${calendarId}/labels`
    );
    return response.data;
  }

  public async getMembers(calendarId: string) {
    const response = await this.axios.get<MembersResult>(
      `/calendars/${calendarId}/members`
    );
    return response.data;
  }

  public async getUpcomingEvents({
    calendarId,
    timezone,
    days,
    include
  }: GetUpcomingEventsParams) {
    const response = await this.axios.get<Events>(
      `calendars/${calendarId}/upcoming_events`,
      {
        params: {
          timezone,
          days,
          include: include && include.join(",")
        }
      }
    );
    return response.data;
  }

  public async getEvent({ eventId, calendarId, include }: GetEventParams) {
    const response = await this.axios.get<Event>(
      `calendars/${calendarId}/events/${eventId}`,
      {
        params: {
          include: include && include.join(",")
        }
      }
    );
    return response.data;
  }

  public async postEvent({ calendarId, ...event }: EventForm) {
    const response = await this.axios.post<Event>(
      `calendars/${calendarId}/events`,
      event,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  }

  public async putEvent({ calendarId, ...event }: EventForm) {
    const response = await this.axios.put<Event>(
      `calendars/${calendarId}/events`,
      event,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  }

  public async deleteEvent({ calendarId, eventId }: DeleteEventParams) {
    const response = await this.axios.delete<{}>(
      `calendars/${calendarId}/events/${eventId}`
    );
    return response.data;
  }

  public async postEventActivity({
    calendarId,
    eventId,
    ...activity
  }: EventActivityForm) {
    const response = await this.axios.post<EventActivity>(
      `calendars/${calendarId}/events/${eventId}/activities`,
      activity,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  }
}
