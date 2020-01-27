export type EventActivityResult = {
  readonly data: {
    readonly id: string;
    readonly type: "activity";
    readonly attributes: {
      readonly content: string;
      readonly updatedAt: string;
      readonly createdAt: string;
    };
  };
};
