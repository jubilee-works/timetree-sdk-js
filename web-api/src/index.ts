import {
  CalendarsResult,
  CalendarResult,
  LabelsResult,
  MembersResult
} from "./types/Calendars";
import { EventsResult, EventResult } from "./types/Events";
import { EventActivityResult } from "./types/EventActivities";
import { EventForm } from "./types/EventForm";
import { EventActivityForm } from "./types/EventActivityForm";
import { User } from "./types/User";
import { ErrorResponse } from "./types/ErrorResponse";

export { TimeTreeClient } from "./TimeTreeClient";
export { Authenticator } from "./Authenticator";

export type Calendars = CalendarsResult;
export type Calendar = CalendarResult;
export type Labels = LabelsResult;
export type Members = MembersResult;
export type Events = EventsResult;
export type Event = EventResult;
export type EventActivity = EventActivityResult;

export { ErrorResponse, EventForm, EventActivityForm, User };
