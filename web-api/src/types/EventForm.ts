type Attributes = {
  /** maxLength: 50 */
  readonly title: string;
  /** maxLength 10000 */
  readonly description?: string;
  /** maxLength 100 */
  readonly location?: string;
  readonly url?: string;
  readonly startTimezone?: string;
  readonly endTimezone?: string;
};

type ScheduleAttributes = Attributes & {
  readonly category: "schedule";
  readonly allDay: boolean;
  readonly startAt: string;
  readonly endAt: string;
};

type KeepAttributes = Attributes & {
  readonly category: "keep";
  readonly allDay?: boolean;
  readonly startAt?: string;
  readonly endAt?: string;
};

type User = {
  readonly id: string;
  readonly type: "user";
};

export type EventForm = {
  readonly calendarId: string;
  readonly data: {
    readonly attributes: ScheduleAttributes | KeepAttributes;
    readonly relationships: {
      readonly label: {
        readonly data: { readonly id: string; readonly type: "label" };
      };
      readonly attendees?: {
        readonly data: readonly User[];
      };
    };
  };
};
