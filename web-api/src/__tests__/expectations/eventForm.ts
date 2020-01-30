/* eslint-disable @typescript-eslint/camelcase */
export const eventForm = {
  data: {
    attributes: {
      category: "schedule",
      title: "Event title",
      all_day: false,
      start_at: "2019-03-18T09:00:00.000Z",
      start_timezone: "UTC",
      end_at: "2019-03-18T10:00:00.000Z",
      end_timezone: "UTC",
      description: "blah blah blah",
      location: "Tokyo",
      url: "https://example.com"
    },
    relationships: {
      label: {
        data: {
          id: "1234,1",
          type: "label"
        }
      },
      attendees: {
        data: [
          { id: "1234,12345", type: "user" },
          { id: "1234,56789", type: "user" }
        ]
      }
    }
  }
};
