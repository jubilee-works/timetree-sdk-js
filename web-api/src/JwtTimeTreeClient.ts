import { APIClient } from "./api";
import {
  Activity,
  ActivityForm,
  Calendar,
  EventForm,
  Label,
  Member,
} from "./types";

type JwtTimeTreeClientOptions = {
  /** you can overwrite for testing purposes */
  readonly baseURL?: string;
  readonly timeout?: number;
};

type GetEventParams = {
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

type GetUpcomingEventsParams = {
  readonly timezone: string;
  /** The number of days to get. A range from 1 to 7 can be specified */
  readonly days?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly include?: IncludeOptions;
};

type IncludeOptions = {
  readonly labels?: boolean;
  readonly members?: boolean;
};

type DeleteEventParams = {
  readonly eventId: string;
};

type DeleteInstallationParams = {
  readonly installationId: string;
};

const parseIncludeOptions = (options: Record<string, boolean | undefined>) => {
  return Object.entries(options)
    .reduce<readonly string[]>(
      (accum, [key, value]) => (value ? [...accum, key] : accum),
      []
    )
    .join(",");
};

export class JwtTimeTreeClient {
  private readonly api: APIClient;

  constructor(accessToken: string, options: JwtTimeTreeClientOptions = {}) {
    this.api = new APIClient({
      ...options,
      baseURL: options.baseURL || "https://timetreeapis.com",
      headers: {
        Accept: "application/vnd.timetree.v1+json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public async deleteInstallation({
    installationId,
  }: DeleteInstallationParams) {
    return await this.api.delete(`/installations/${installationId}`);
  }

  public async getCalendar() {
    return await this.api.get<Calendar>("/calendar");
  }

  public async getLabels() {
    return await this.api.get<readonly Label[]>("/calendar/labels");
  }

  public async getMembers() {
    return await this.api.get<readonly Member[]>("/calendar/members");
  }

  public async getUpcomingEvents({
    timezone,
    days,
    include,
  }: GetUpcomingEventsParams) {
    return this.api.get<readonly Event[]>(`/calendar/upcoming_events`, {
      params: {
        timezone,
        days,
        include: include && parseIncludeOptions(include),
      },
    });
  }

  public async getEvent({ eventId }: GetEventParams) {
    return this.api.get<Event>(`/calendar/events/${eventId}`);
  }

  public async createEvent({ ...json }: EventForm) {
    return this.api.post<Event>(`/calendar/events`, json);
  }

  public async updateEvent({ ...json }: UpdateEventForm) {
    return this.api.put<Event>(`/calendar/events`, json);
  }

  public async deleteEvent({ eventId }: DeleteEventParams) {
    return this.api.delete(`/calendar/events/${eventId}`);
  }

  public async createActivity({ eventId, ...json }: ActivityForm) {
    return this.api.post<Activity>(
      `/calendar/events/${eventId}/activities`,
      json
    );
  }
}
