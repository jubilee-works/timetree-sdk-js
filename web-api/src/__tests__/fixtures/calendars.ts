/* eslint-disable @typescript-eslint/camelcase */
export const calendars = {
  data: [
    {
      id: "1234",
      type: "calendar",
      attributes: {
        name: "Some Calendar1",
        description: "Calendar description",
        color: "#2ecc87",
        order: 0,
        image_url: "https://attachments.timetreeapp.com/path/to/image.png",
        created_at: "2019-04-01T12:34:56.000Z",
      },
      relationships: {
        labels: {
          data: [
            { id: "1234,1", type: "label" },
            // ...
            { id: "1234,10", type: "label" },
          ],
        },
        members: {
          data: [
            { id: "1234,12345", type: "user" },
            { id: "1234,23456", type: "user" },
          ],
        },
      },
    },
    {
      id: "5678",
      type: "calendar",
      attributes: {
        name: "Some Calendar2",
        description: "Calendar description",
        color: "#2ecc87",
        order: 1,
        image_url: "https://attachments.timetreeapp.com/path/to/image.png",
        created_at: "2019-04-01T12:34:56.000Z",
      },
      relationships: {},
    },
  ],
  included: [
    {
      id: "1234,1",
      type: "label",
      attributes: {
        name: "label title(empty if default)",
        color: "#2ecc87",
      },
    },
    {
      id: "1234,12345",
      type: "user",
      attributes: {
        name: "User1",
        description: "blah blah blah",
        image_url: "https://attachments.timetreeapp.com/path/to/image.png",
      },
    },
  ],
};
