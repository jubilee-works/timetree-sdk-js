import { TimeTreeClient } from "../TimeTreeClient";
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
  activity,
  activityForm,
  eventForm,
} from "./fixtures";
import {
  expectedCalendars,
  expectedCalendar,
  expecteLabels,
  expectedMembers,
  expectedUpcomingEvents,
  expectedEvent,
  expectedUser,
  expectedActivity,
  expectedActivityForm,
  expectedEventForm,
} from "./expectations";

const axiosCreateMock = jest.spyOn(axios, "create");

describe("TimeTreeClient", () => {
  describe("constructor", () => {
    it("should build default settings", () => {
      const accessToken = "fake-access-token";
      const client = new TimeTreeClient(accessToken);
      expect(client).toBeInstanceOf(TimeTreeClient);
      expect(axiosCreateMock).toHaveBeenCalledWith({
        baseURL: "https://timetreeapis.com",
        headers: {
          Accept: "application/vnd.timetree.v1+json",
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: undefined,
        paramsSerializer: expect.anything(),
        transformRequest: expect.anything(),
        transformResponse: expect.anything(),
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
        nock("https://timetreeapis.com").get("/user").reply(200, user);
      });

      it("should resolve values", async () => {
        const response = await client.getUser();
        expect(response).toEqual(expectedUser);
      });
    });

    describe("when calling api is 404", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get("/user")
          .reply(404, {
            data: {
              type:
                "https://developers.timetreeapp.com/en/docs/api#client-failure",
              title: "Not Found",
              status: 404,
              errors: "Calendar not found",
            },
          });
      });

      it("should reject values", async () => {
        const error = await client.getUser().catch((e) => e);
        expect(error.response.data).toEqual({
          data: {
            type:
              "https://developers.timetreeapp.com/en/docs/api#client-failure",
            title: "Not Found",
            status: 404,
            errors: "Calendar not found",
          },
        });
      });
    });

    describe("when calling api is 404 without data", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com").get("/user").reply(404);
      });

      it("should reject Error", async () => {
        const error = await client.getUser().catch((e) => e);
        expect(error).toBeInstanceOf(Error);
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
          .get(`/calendars`)
          .query({ include: "labels,members" })
          .reply(200, calendars);
      });

      it("should resolve values", async () => {
        const response = await client.getCalendars({
          labels: true,
          members: true,
        });
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
          .get(`/calendars/${testCalendarId}/upcoming_events`)
          .query({
            timezone: testTimeZone,
          })
          .reply(200, upcomingEvents);
      });

      it("should resolve values", async () => {
        const response = await client.getUpcomingEvents({
          calendarId: testCalendarId,
          timezone: testTimeZone,
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
          eventId: testEventId,
        });
        expect(response).toEqual(expectedEvent);
      });
    });
  });

  describe("createEvent", () => {
    const testCalendarId = "test-calendar-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .post(`/calendars/${testCalendarId}/events`, expectedEventForm)
          .reply(200, event);
      });

      it("should resolve values", async () => {
        const response = await client.createEvent({
          calendarId: testCalendarId,
          ...eventForm,
        });
        expect(response).toEqual(expectedEvent);
      });
    });
  });

  describe("updateEvent", () => {
    const testCalendarId = "test-calendar-id";
    const testEventId = "test-event-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .put(
            `/calendars/${testCalendarId}/events${testEventId}`,
            expectedEventForm
          )
          .reply(200, event);
      });

      it("should resolve values", async () => {
        const response = await client.updateEvent({
          calendarId: testCalendarId,
          eventId: testEventId,
          ...eventForm,
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
        const response = await client.deleteEvent({
          calendarId: testCalendarId,
          eventId: testEventId,
        });
        expect(response?.status).toBe(200);
      });
    });
  });

  describe("createActivity", () => {
    const testCalendarId = "test-calendar-id";
    const testEventId = "test-event-id";
    let client: TimeTreeClient;

    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .post(
            `/calendars/${testCalendarId}/events/${testEventId}/activities`,
            expectedActivityForm
          )
          .reply(200, activity);
      });

      it("should resolve values", async () => {
        const response = await client.createActivity({
          calendarId: testCalendarId,
          eventId: testEventId,
          ...activityForm,
        });
        expect(response).toEqual(expectedActivity);
      });
    });
  });
});
