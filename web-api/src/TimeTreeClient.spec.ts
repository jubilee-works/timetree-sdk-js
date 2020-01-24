import { TimeTreeClient } from "./TimeTreeClient";
import axios from "axios";
import nock from "nock";

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
      })
    })
  });

  describe("getCalendar", () => {
    let client: TimeTreeClient;
    beforeEach(() => {
      client = new TimeTreeClient("fake-access-token");
    });

    describe("when calling api succeed", () => {
      beforeEach(() => {
        nock("https://timetreeapis.com")
          .get("/calendars")
          .reply(200, { data: [{ id: 123 }], included: [] })
      });
  
      it("should resolve values", async () => {
        const response = await client.getCalendars();
        expect(response.data).toEqual({ data: [{ id: 123 }] , included: []});
      })
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
          .get(`/calendars/${testCalendarId}/upcoming_events?timezone=${testTimeZone}`)
          .reply(200, { data: [{ id: "abc" }] })
      });
  
      it("should resolve values", async () => {
        const response = await client.getUpcomingEvents({
          calendarId: testCalendarId,
          timezone: testTimeZone
        });
        expect(response.data).toEqual({ data: [{ id: "abc" }]});
      })
    });
  });
});