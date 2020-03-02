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

### Request to TimeTree Web API
https://codesandbox.io/embed/flamboyant-haze-jfi63?fontsize=14&hidenavigation=1&theme=dark

```ts
import { TimeTreeClient } from '@timetreeapp/web-api';

const client = new TimeTreeClient("<your-access-token>");

(async () => {
  const data = await client.getCalendars();
  console.log("calendars", data);
})();
```

#### Options
```ts
new TimeTreeClient(
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
[TimeTree API](https://developers.timetreeapp.com/ja/docs/api) conforms to JSONAPI. but this sdk can deserialize response data and request data.


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
      image_url: "https://attachmentstimetreeapp.com/path/to/ image.png",
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

### Get Access Token

1. Execute `Authenticator#authorize` to access https://timetreeapp.com/oauth/authorize with query parameters below.

```ts
import { Authenticator } from "@timetreeapp/web-api";

const authenticator = new Authenticator();

authenticator.authorize({
  clientId: "<your-client-id>",
  redirectUri: "https://<your-redirect-uri>",
  state: "<your-state>",
});
// -> TimeTree redirects to URI specified redirect_uri with code parameter. The code parameter expires in 10 minutes
```

2. Execute `Authenticator#getToken` with the following parameters to JSON body to get access token when redirected.

```ts
const response = await authenticator.getToken({
  clientId: "<your-client-id>",
  clientSecret: "<your-client-secret>",
  redirectUri: "https://<your-redirect-uri>",
  // code is included in query parameters
  //   GET {redirect_uri}?code={code}&state={csrf_token}
  code:"<your-code>",
  grantType: "authorization_code"
});

console.log(response.accessToken);
```

or using some oauth2 library like [client-oauth2](https://www.npmjs.com/package/client-oauth2)


## Licence
MIT