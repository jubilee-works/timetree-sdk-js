export const calendars = [
  {
    id: "1234",
    type: "calendar",
    name: "Some Calendar1",
    description: "Calendar description",
    color: "#2ecc87",
    order: 0,
    imageUrl: "https://attachments.timetreeapp.com/path/to/image.png",
    createdAt: "2019-04-01T12:34:56.000Z",
    labels: [
      {
        id: "1234,1",
        type: "label",
        color: "#2ecc87",
        name: "label title(empty if default)"
      },
      { id: "1234,10", type: "label" }
    ],
    members: [
      {
        id: "1234,12345",
        type: "user",
        name: "User1",
        description: "blah blah blah",
        imageUrl: "https://attachments.timetreeapp.com/path/to/image.png"
      },
      { id: "1234,23456", type: "user" }
    ]
  },
  {
    id: "5678",
    type: "calendar",
    name: "Some Calendar2",
    description: "Calendar description",
    color: "#2ecc87",
    order: 1,
    imageUrl: "https://attachments.timetreeapp.com/path/to/image.png",
    createdAt: "2019-04-01T12:34:56.000Z",
    relationships: {}
  }
];
