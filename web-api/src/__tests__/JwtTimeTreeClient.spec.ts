import { JwtTimeTreeClient } from "../JwtTimeTreeClient";
import axios from "axios";
import nock from "nock";
import {
  calendar,
  event,
  eventForm,
  labels,
  members,
  upcomingEvents,
} from "./fixtures";
import {
  expectedCalendar,
  expectedEvent,
  expectedLabels,
  expectedMembers,
  expectedUpcomingEvents,
} from "./expectations";

const axiosCreateMock = jest.spyOn(axios, "create");

describe("JwtTimeTreeClient", () => {
  describe("constructor", () => {
    it("should build default settings", () => {
      const accessToken = "fake-access-token";
      const client = new JwtTimeTreeClient(accessToken);
      expect(client).toBeInstanceOf(JwtTimeTreeClient);
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

  describe("getCalendar", () => {
    let client: JwtTimeTreeClient;

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com").get("/calendar").reply(200, calendar);
      });

      it("should resolve values", async () => {
        const response = await client.getCalendar();
        expect(response).toEqual(expectedCalendar);
      });
    });
  });

  describe("getLabels", () => {
    let client: JwtTimeTreeClient;

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get("/calendar/labels")
          .reply(200, labels);
      });

      it("should resolve values", async () => {
        const response = await client.getLabels();
        expect(response).toEqual(expectedLabels);
      });
    });
  });

  describe("getMembers", () => {
    let client: JwtTimeTreeClient;

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get("/calendar/members")
          .reply(200, members);
      });

      it("should resolve values", async () => {
        const response = await client.getMembers();
        expect(response).toEqual(expectedMembers);
      });
    });
  });

  describe("getUpcomingEvents", () => {
    let client: JwtTimeTreeClient;
    const testTimeZone = "America/New_York";

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get("/calendar/upcoming_events")
          .query({
            timezone: testTimeZone,
          })
          .reply(200, upcomingEvents);
      });

      it("should resolve values", async () => {
        const response = await client.getUpcomingEvents({
          timezone: testTimeZone,
        });
        expect(response).toEqual(expectedUpcomingEvents);
      });
    });
  });

  describe("getEvent", () => {
    let client: JwtTimeTreeClient;
    const testEventId = "test-event-id";

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get(`/calendar/events/${testEventId}`)
          .reply(200, event);
      });

      it("should resolve values", async () => {
        const response = await client.getEvent({ eventId: testEventId });
        expect(response).toEqual(expectedEvent);
      });
    });
  });

  describe("createEvent", () => {
    let client: JwtTimeTreeClient;
    const testCalendarId = "test-calendar-id";
    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .post(`/calendar/events`)
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
    let client: JwtTimeTreeClient;
    const testCalendarId = "test-calendar-id";
    const testEventId = "test-event-id";

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .put(`/calendar/events`)
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
    let client: JwtTimeTreeClient;
    const testEventId = "test-event-id";

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .delete(`/calendar/events/${testEventId}`)
          .reply(200);
      });

      it("should resolve values", async () => {
        const response = await client.deleteEvent({
          eventId: testEventId,
        });
        expect(response?.status).toBe(200);
      });
    });
  });

  describe("deleteInstallation", () => {
    let client: JwtTimeTreeClient;
    const testInstallationId = "test-installation-id";

    beforeEach(() => {
      client = new JwtTimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .delete(`/installations/${testInstallationId}`)
          .reply(200);
      });

      it("should resolve values", async () => {
        const response = await client.deleteInstallation({
          installationId: testInstallationId,
        });
        expect(response?.status).toBe(200);
      });
    });
  });
});
