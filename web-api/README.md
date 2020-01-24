# TimeTree Web API

`@timetreeapp/web-api` is simple HTTP client for requesting to TimeTree's [Web API](https://developers.timetreeapp.com/en/docs/api).

# Installation

```bash
$ npm install @timetreeapp/web-api
# if you prefer yarn
$ yarn add @timetreeapp/web-api
```
# Usage

```ts
import { TimeTreeClient } from '@timetreeapp/web-api';

const client = new TimeTreeClient("your-access-token");

(async () => {
  const response = await client.getCalendars();
  console.log("calendars", response.data);
})();
```