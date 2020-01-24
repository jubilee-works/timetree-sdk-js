export type EventActivityResult = {
  readonly data: {
    readonly id: string;
    readonly type: "activity";
    readonly attributes: {
      readonly content: string;
      readonly updated_at: string;
      readonly created_at: string;
    };
  };
};
