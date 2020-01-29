import axios, { AxiosInstance } from "axios";
import humps from "humps";
import qs from "qs";
import { deserialise } from "kitsu-core";

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
        data => {
          // when data does not have "include", "deserialise" does not work.
          if (!data) {
            return data;
          }
          const newData = data?.hasOwnProperty("included")
            ? data
            : { ...data, included: [] };
          return deserialise(newData);
        }
      ],
      transformRequest: [
        data => humps.decamelizeKeys(data),
        ...[axios.defaults.transformRequest].flat()
      ],
      timeout: options.timeout
    });
  }

  public async getUser() {
    const { data: user } = await this.axios.get<{ readonly data: User }>(
      "/user"
    );
    return user.data;
  }

  public async getCalendars(include?: IncludeOptions) {
    const { data: calendars } = await this.axios.get<{
      readonly data: readonly Calendar[];
    }>("/calendars", {
      params: {
        include: include && include.join(",")
      }
    });
    return calendars.data;
  }

  public async getCalendar(calendarId: string, include?: IncludeOptions) {
    const { data } = await this.axios.get<{ readonly data: Calendar }>(
      `/calendars/${calendarId}`,
      {
        params: {
          include: include && include.join(",")
        }
      }
    );
    return data.data;
  }

  public async getLabels(calendarId: string) {
    const { data: labels } = await this.axios.get<{
      readonly data: readonly Label[];
    }>(`/calendars/${calendarId}/labels`);
    return labels.data;
  }

  public async getMembers(calendarId: string) {
    const { data: members } = await this.axios.get<{
      readonly data: readonly Member[];
    }>(`/calendars/${calendarId}/members`);
    return members.data;
  }

  public async getUpcomingEvents({
    calendarId,
    timezone,
    days,
    include
  }: GetUpcomingEventsParams) {
    const { data: events } = await this.axios.get<{
      readonly data: readonly Event[];
    }>(`calendars/${calendarId}/upcoming_events`, {
      params: {
        timezone,
        days,
        include: include && include.join(",")
      }
    });
    return events.data;
  }

  public async getEvent({ eventId, calendarId, include }: GetEventParams) {
    const { data: event } = await this.axios.get<{ readonly data: Event }>(
      `calendars/${calendarId}/events/${eventId}`,
      {
        params: {
          include: include && include.join(",")
        }
      }
    );
    return event.data;
  }

  public async postEvent({ calendarId, ...event }: EventForm) {
    const { data: resultEvent } = await this.axios.post<{
      readonly data: Event;
    }>(`calendars/${calendarId}/events`, event, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return resultEvent.data;
  }

  public async putEvent({ calendarId, ...event }: EventForm) {
    const { data: resultEvent } = await this.axios.put<{
      readonly data: Event;
    }>(`calendars/${calendarId}/events`, event, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return resultEvent.data;
  }

  public async deleteEvent({ calendarId, eventId }: DeleteEventParams) {
    const response = await this.axios.delete<{}>(
      `calendars/${calendarId}/events/${eventId}`
    );
    return response.data;
  }

  public async postActivity({
    calendarId,
    eventId,
    ...activity
  }: ActivityForm) {
    const { data: resultActivity } = await this.axios.post<{
      readonly data: Activity;
    }>(`calendars/${calendarId}/events/${eventId}/activities`, activity, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return resultActivity.data;
  }
}
