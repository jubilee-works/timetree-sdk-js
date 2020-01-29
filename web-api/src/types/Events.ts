type User = {
  readonly id: string;
  readonly type: "user";
};

export type Event = {
  readonly id: string;
  readonly type: "event";
  readonly category: "schedule" | "keep";
  readonly title: string;
  readonly allDay: boolean;
  readonly startAt: string;
  readonly startTimezone: string;
  readonly endAt: string;
  readonly endTimezone: string;
  readonly recurrences: readonly string[];
  readonly description: string;
  readonly location: string;
  readonly url: string;
  readonly updatedAt: string;
  readonly createdAt: string;
  readonly creator: User;
  readonly label: {
    readonly id: string;
    readonly type: "label";
  };
  readonly attendees: readonly User[];
};
