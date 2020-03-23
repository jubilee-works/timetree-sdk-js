/* eslint-disable @typescript-eslint/camelcase */
export const event = {
  data: {
    id: "c9c8e0fd66c34505a876d88cb4bb3b2a",
    type: "event",
    attributes: {
      category: "schedule",
      title: "Event title",
      all_day: false,
      start_at: "2019-03-18T09:00:00.000Z",
      start_timezone: "UTC",
      end_at: "2019-03-18T10:00:00.000Z",
      end_timezone: "UTC",
      recurrences: [],
      description: "blah blah blah",
      location: "Tokyo",
      url: "https://example.com",
      updated_at: "2019-03-18T09:53:33.123Z",
      created_at: "2019-03-18T09:53:33.123Z",
    },
    relationships: {
      creator: {
        data: {
          id: "1234,12345",
          type: "user",
        },
      },
      label: {
        data: {
          id: "1234,1",
          type: "label",
        },
      },
      attendees: {
        data: [
          { id: "1234,12345", type: "user" },
          { id: "1234,56789", type: "user" },
        ],
      },
    },
  },
};
