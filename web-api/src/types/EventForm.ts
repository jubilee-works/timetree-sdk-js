type User = {
  readonly id: string;
  readonly type: "user";
};

type Attributes = {
  readonly calendarId: string;
  /** maxLength: 50 */
  readonly title: string;
  /** maxLength 10000 */
  readonly description?: string;
  /** maxLength 100 */
  readonly location?: string;
  readonly url?: string;
  readonly startTimezone?: string;
  readonly endTimezone?: string;
  readonly label: {
    readonly id: string;
    readonly type: "label";
  };
  readonly attendees?: readonly User[];
};

type ScheduleForm = Attributes & {
  readonly category: "schedule";
  readonly allDay: boolean;
  readonly startAt: string;
  readonly endAt: string;
};

type KeepForm = Attributes & {
  readonly category: "keep";
  readonly allDay?: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
};

export type EventForm = ScheduleForm | KeepForm;
