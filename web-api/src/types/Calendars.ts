export type Label = {
  readonly id: string;
  readonly type: "label";
  readonly name?: string;
  readonly color?: string;
};

export type Member = {
  readonly id: string;
  readonly type: "user";
  readonly name?: string;
  readonly description?: string;
  readonly imageUrl?: string;
};

export type Calendar = {
  readonly id: string;
  readonly type: "calendar";
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly order: number;
  readonly imageUrl: string;
  readonly createdAt: string;
  readonly labels?: readonly Label[];
  readonly members?: readonly Member[];
};
