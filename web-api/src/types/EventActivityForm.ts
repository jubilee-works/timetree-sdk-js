export type EventActivityForm = {
  readonly calendarId: string;
  readonly eventId: string;
  readonly data: {
    readonly attributes: {
      readonly content: string;
    };
  };
};
