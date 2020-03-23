import { APIClient } from "../api";
import nock from "nock";

describe("APIClient", () => {
  describe("when request is timeout on server", () => {
    beforeEach(() => {
      nock("https://timetreeapis.com").get("/user").once().reply(408);
      nock("https://timetreeapis.com").get("/user").reply(200);
    });

    it("should retry request", async () => {
      const retryMock = jest.fn();
      const api = new APIClient(
        {},
        {
          retry: 1,
          onRetry: retryMock,
        }
      );
      await api.get("https://timetreeapis.com/user");
      expect(retryMock).toHaveBeenCalledWith(
        new Error("Request failed with status code 408"),
        1
      );
    });
  });

  describe("when request is timeout on client", () => {
    beforeEach(() => {
      nock("https://timetreeapis.com").get("/user").delay(51).reply(408);
      nock("https://timetreeapis.com").get("/user").reply(200);
    });

    it("should retry request", async () => {
      const retryMock = jest.fn();
      const api = new APIClient(
        {
          timeout: 50,
        },
        {
          retry: 1,
          onRetry: retryMock,
          validateRetryable: (error) => {
            return error.code === "ECONNABORTED";
          },
        }
      );
      await api.get("https://timetreeapis.com/user");
      expect(retryMock).toHaveBeenCalledWith(
        new Error("timeout of 50ms exceeded"),
        1
      );
    });
  });

  describe("when request is 404", () => {
    beforeEach(() => {
      nock("https://timetreeapis.com").get("/user").twice().reply(404);
    });

    it("should not retry request", async () => {
      const retryMock = jest.fn();
      const api = new APIClient(
        {},
        {
          retry: 1,
          onRetry: retryMock,
        }
      );
      await expect(api.get("https://timetreeapis.com/user")).rejects.toEqual(
        new Error("Request failed with status code 404")
      );
      expect(retryMock).not.toHaveBeenCalled();
    });
  });
});
