import {
  CalendarsResult,
  CalendarResult,
  LabelsResult,
  MembersResult
} from "./types/Calendars";
import { EventsResult, EventResult } from "./types/Events";

export { TimeTreeClient } from "./TimeTreeClient";

export type Calendars = CalendarsResult;
export type Calendar = CalendarResult;
export type Labels = LabelsResult;
export type Members = MembersResult;
export type Events = EventsResult;
export type Event = EventResult;
