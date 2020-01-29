import { TimeTreeClient } from "./TimeTreeClient";
import axios from "axios";
import nock from "nock";
import {
  calendars,
  calendar,
  labels,
  members,
  upcomingEvents,
  event,
  user,
  activity
} from "./__tests__/fixtures";
import {
  expectedCalendars,
  expectedCalendar,
  expecteLabels,
  expectedMembers,
  expectedUpcomingEvents,
  expectedEvent,
  expectedUser,
  expectedActivity
} from "./__tests__/expectations";

const axiosCreationMock = jest.spyOn(axios, "create");

describe("TimeTreeClient", () => {
  describe("constructor", () => {
    it("should build default settings", () => {
      const accessToken = "fake-access-token";
      const client = new TimeTreeClient(accessToken);
      expect(client).toBeInstanceOf(TimeTreeClient);
      expect(axiosCreationMock).toHaveBeenCalledWith({
        baseURL: "https://timetreeapis.com/",
        headers: {
          Accept: "application/vnd.timetree.v1+json",
          Authorization: `Bearer ${accessToken}`
        },
        transformResponse: expect.anything(),
        transformRequest: expect.anything(),
        paramsSerializer: expect.anything()
      });
    });
  });

  describe("getUser", () => {
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/user`)
          .reply(200, user);
      });

      it("should resolve values", async () => {
        const response = await client.getUser();
        expect(response).toEqual(expectedUser);
      });
    });
  });

  describe("getCalendars", () => {
    let client: TimeTreeClient;
    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api without include option", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get("/calendars")
          .reply(200, calendars);
      });

      it("should resolve values", async () => {
        const response = await client.getCalendars();
        expect(response).toEqual(expectedCalendars);
      });
    });

    describe("when calling api with include option", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/calendars?include=labels,members`)
          .reply(200, calendars);
      });

      it("should resolve values", async () => {
        const response = await client.getCalendars(["labels", "members"]);
        expect(response).toEqual(expectedCalendars);
      });
    });
  });

  describe("getCalendar", () => {
    const testCalendarId = "test-calendar-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/calendars/${testCalendarId}`)
          .reply(200, calendar);
      });

      it("should resolve values", async () => {
        const response = await client.getCalendar(testCalendarId);
        expect(response).toEqual(expectedCalendar);
      });
    });
  });

  describe("getLabels", () => {
    const testCalendarId = "test-calendar-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/calendars/${testCalendarId}/labels`)
          .reply(200, labels);
      });

      it("should resolve values", async () => {
        const response = await client.getLabels(testCalendarId);
        expect(response).toEqual(expecteLabels);
      });
    });
  });

  describe("getMembers", () => {
    const testCalendarId = "test-calendar-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/calendars/${testCalendarId}/members`)
          .reply(200, members);
      });

      it("should resolve values", async () => {
        const response = await client.getMembers(testCalendarId);
        expect(response).toEqual(expectedMembers);
      });
    });
  });

  describe("getUpcomingEvents", () => {
    const testCalendarId = "test-calendar-id";
    const testTimeZone = "America/New_York";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(
            `/calendars/${testCalendarId}/upcoming_events?timezone=${testTimeZone}`
          )
          .reply(200, upcomingEvents);
      });

      it("should resolve values", async () => {
        const response = await client.getUpcomingEvents({
          calendarId: testCalendarId,
          timezone: testTimeZone
        });
        expect(response).toEqual(expectedUpcomingEvents);
      });
    });
  });

  describe("getEvent", () => {
    const testCalendarId = "test-calendar-id";
    const testEventId = "test-event-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/calendars/${testCalendarId}/events/${testEventId}`)
          .reply(200, event);
      });

      it("should resolve values", async () => {
        const response = await client.getEvent({
          calendarId: testCalendarId,
          eventId: testEventId
        });
        expect(response).toEqual(expectedEvent);
      });
    });
  });

  describe("postEvent", () => {
    const testCalendarId = "test-calendar-id";
    const testForm = {
      data: {
        attributes: {
          category: "keep",
          title: "test-keep"
        },
        relationships: {
          label: {
            data: {
              id: "1234,1",
              type: "label"
            }
          }
        }
      }
    } as const;
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .post(`/calendars/${testCalendarId}/events`, testForm)
          .reply(200, event);
      });

      it("should resolve values", async () => {
        const response = await client.postEvent({
          calendarId: testCalendarId,
          ...testForm
        });
        expect(response).toEqual(expectedEvent);
      });
    });
  });

  describe("putEvent", () => {
    const testCalendarId = "test-calendar-id";
    const testForm = {
      data: {
        attributes: {
          category: "keep",
          title: "test-keep"
        },
        relationships: {
          label: {
            data: {
              id: "1234,1",
              type: "label"
            }
          }
        }
      }
    } as const;
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .put(`/calendars/${testCalendarId}/events`, testForm)
          .reply(200, event);
      });

      it("should resolve values", async () => {
        const response = await client.putEvent({
          calendarId: testCalendarId,
          ...testForm
        });
        expect(response).toEqual(expectedEvent);
      });
    });
  });

  describe("deleteEvent", () => {
    const testCalendarId = "test-calendar-id";
    const testEventId = "test-event-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .delete(`/calendars/${testCalendarId}/events/${testEventId}`)
          .reply(200);
      });

      it("should resolve values", async () => {
        await expect(
          client.deleteEvent({
            calendarId: testCalendarId,
            eventId: testEventId
          })
        ).resolves.toBeDefined();
      });
    });
  });

  describe("postEventActivity", () => {
    const testCalendarId = "test-calendar-id";
    const testEventId = "test-event-id";
    const testForm = {
      data: {
        attributes: {
          content: "test-content"
        }
      }
    } as const;
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .post(
            `/calendars/${testCalendarId}/events/${testEventId}/activities`,
            testForm
          )
          .reply(200, activity);
      });

      it("should resolve values", async () => {
        const response = await client.postActivity({
          calendarId: testCalendarId,
          eventId: testEventId,
          ...testForm
        });
        expect(response).toEqual(expectedActivity);
      });
    });
  });
});
