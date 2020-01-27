type User = {
  readonly id: string;
  readonly type: "user";
};

type Label = {
  readonly id: string;
  readonly type: "label";
};

type Attendees = {
  readonly data: readonly User[];
};

type Creator = {
  readonly data: User;
};

type Relationships = {
  readonly creator: Creator;
  readonly label: {
    readonly data: Label;
  };
  readonly attendees: Attendees;
};

type Attributes = {
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
};

type Event = {
  readonly id: string;
  readonly type: "event";
  readonly attributes: Attributes;
  readonly relationships: Relationships;
};

export type EventsResult = {
  readonly data: readonly Event[];
};

export type EventResult = {
  readonly data: Event;
};
