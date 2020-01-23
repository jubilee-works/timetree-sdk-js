# TimeTree Web API

`@timetree/web-api` is simple HTTP client for requesting to TimeTree's [Web API](https://developers.timetreeapp.com/en/docs/api).

# Installation

```bash
$ npm install @timetree/web-api
# if you prefer yarn
$ yarn add @timetree/web-api
```
# Usage

```ts
import { TimeTreeClient } from '@timetree/web-api';

const client = new TimeTreeClient("your-access-token");

(async () => {
  const response = await client.getCalendars();
  console.log("calendars", response.data);
})();
```