type Relationships = {
  readonly data: readonly {
    readonly id: string;
    readonly type: "label" | "user";
  }[];
};

type Calendar = {
  readonly id: string;
  readonly type: "calendar";
  readonly attributes: {
    readonly name: string;
    readonly description: string;
    readonly color: string;
    readonly order: number;
    readonly image_url: string;
    readonly created_at: string;
  };
  readonly relationships: {
    readonly labels?: Relationships;
    readonly members?: Relationships;
  };
};

type Label = {
  readonly id: string;
  readonly type: "label";
  readonly attributes: {
    readonly name: string;
    readonly color?: string;
  };
};

type User = {
  readonly id: string;
  readonly type: "user";
  readonly attributes: {
    readonly name: string;
    readonly description?: string;
    readonly image_url?: string;
  };
};

export type CalendarsResult = {
  readonly data: readonly Calendar[];
  readonly included: readonly (Label | User)[];
};

export type CalendarResult = {
  readonly data: readonly Calendar[];
  readonly included: readonly (Label | User)[];
};

export type LabelsResult = {
  readonly data: readonly Label[];
};

export type MembersResult = {
  readonly data: readonly User[];
};
