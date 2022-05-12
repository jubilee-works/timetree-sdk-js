# TimeTree Web API


[![npm version](https://badge.fury.io/js/%40timetreeapp%2Fweb-api.svg)](https://badge.fury.io/js/%40timetreeapp%2Fweb-api) 
![](https://circleci.com/gh/jubilee-works/timetree-sdk-js/tree/master.svg?style=shield&circle-token=b8b9a4c41c77e8ce1ce524c2cd355417571e2d0f)

`@timetreeapp/web-api` is simple HTTP client for requesting to TimeTree's [Web API](https://developers.timetreeapp.com/en/docs/api).


## Installation

```bash
$ npm install @timetreeapp/web-api
# if you prefer yarn
$ yarn add @timetreeapp/web-api
```
## Usage

### Accessing API endpoints as a OAuth App
https://codesandbox.io/s/nifty-firefly-93mwg?fontsize=14&hidenavigation=1&theme=dark

```ts
import { OAuthClient } from "@timetreeapp/web-api";

const client = new OAuthClient("<your-access-token>");

(async () => {
  const data = await client.getCalendars();
  console.log("calendars", data);
})();
```

#### Options
```ts
new OAuthClient(
  accessToken: string;
  {
  // you can overwrite for testing purposes
  baseURL?: string;

  // specifies the number of milliseconds before the request times out.
  // this api is using axios timeout
  // see: https://github.com/axios/axios
  timeout?: number; // default is `0` (no timeout)

  // specifies the number of times to retry the request
  retry?: number; // default is `0` (no retry)

  // specifies whether retry to request when using retry option.
  // parameters is axios's error response
  validateRetryable?: (error: AxiosError) => boolean;

  // callbacks before retry
  onRetry?: (e: Error, count: number) => boolean;
})
```

#### Scheme
[TimeTree API](https://developers.timetreeapp.com/docs/api/overview) conforms to JSONAPI. But this sdk can deserialize response data and request data.


```ts
// server response
{
  data: {
    id: "1234",
    type: "calendar",
    attributes: {
      name: "Some Calendar",
      description: "Calendar description",
      color: "#2ecc87",
      order: 0,
      image_url: "https://attachments.timetreeapp.com/path/to/image.png",
      created_at: "2019-04-01T12:34:56.000Z"
    },
    relationships: {
      labels: {
        data: [...]
      }
    }
  }
}
// #getCalendar result
{
  id: "1234",
  type: "calendar",
  name: "Some Calendar",
  description: "Calendar description",
  color: "#2ecc87",
  order: 0,
  imageUrl: "https://attachments.timetreeapp.com/path/to/image.png",
  createdAt: "2019-04-01T12:34:56.000Z",
  labels: [
    {
      id: "1234,1",
      type: "label",
      name: "label title(empty if default)",
      color: "#2ecc87"
    },
    { id: "1234,2", type: "label" },
  ]
}
```

#### Error Handling
this client throws axios's error object as it is.
see https://github.com/axios/axios#handling-errors
```ts
try {
  const data = client.getUser();
} catch (e) {
  e.response?.status
}
```

### Get OAuth Access Token

TimeTree API uses OAuth2, you can use some OAuth2 library like [client-oauth2](https://www.npmjs.com/package/client-oauth2)



### Accessing API endpoints as a Calendar App

```ts
import { CalendarAppAuthenticator, CalendarAppClient } from "@timetreeapp/web-api";

// Generate and download the private key. Please refer to the link below.
// https://developers.timetreeapp.com/docs/api/calendar-app
const authenticator = new CalendarAppAuthenticator({
  applicationId: "<your-calendar-app-id>",
  privateKey: "-----BEGIN RSA PRIVATE KEY-----\n....-----END RSA PRIVATE KEY-----\n",
});

(async () => {
  // When the Calendar App is linked by the user, TimeTree will
  // notify installation_id in an HTTP POST request.
  const response = await authenticator.getAccessToken("<installation-id>");

  const client = new CalendarAppClient(response.accessToken);
  const data = await client.getCalendar();
  console.log("calendar", data);
})();
```

## Licence
MIT
