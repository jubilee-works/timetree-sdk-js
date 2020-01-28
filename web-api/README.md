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

### Request to TimeTree Web API
```ts
import { TimeTreeClient } from '@timetreeapp/web-api';

const client = new TimeTreeClient("<your-access-token>");

(async () => {
  const response = await client.getCalendars();
  console.log("calendars", response.data);
})();
```

## Contribution

## Licence