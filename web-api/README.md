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

```ts
import { TimeTreeClient } from '@timetreeapp/web-api';

const client = new TimeTreeClient("your-access-token");

(async () => {
  const response = await client.getCalendars();
  console.log("calendars", response.data);
})();
```

## Contribution

## Licence