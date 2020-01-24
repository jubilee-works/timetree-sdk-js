type Attributes = {
  /** maxLength: 50 */
  readonly title: string;
  /** maxLength 10000 */
  readonly description?: string;
  /** maxLength 100 */
  readonly location?: string;
  readonly url?: string;
  readonly start_timezone?: string;
  readonly end_timezone?: string;
};

type ScheduleAttributes = Attributes & {
  readonly category: "schedule";
  readonly all_day: boolean;
  readonly start_at: string;
  readonly end_at: string;
};

type KeepAttributes = Attributes & {
  readonly category: "keep";
  readonly all_day?: boolean;
  readonly start_at?: string;
  readonly end_at?: string;
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
