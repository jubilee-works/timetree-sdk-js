export type User = {
  readonly data: {
    readonly id: string;
    readonly type: "user";
    readonly attributes: {
      readonly name: string;
      readonly description: string;
      readonly image_url: string;
    };
  };
};
