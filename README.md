# The-Red-Planet - Node.js

### About the project
A fun small project getting the latest weather in Mars and rover pictures using Nasa Open Apis.

### Built with:
- Node.js / Express 4.17.1
- Ejs 3.1.6
- Sass 6.0.1

## Prerequisites

```
npm install
npm start

```
## Querying API

### HTTP Request
GET https: //api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0

### Query Parameters
| Parameter | Type | Default | Description
| --- | --- | --- | --- | 
| version | float | 1.0 | The version of this API
| feedtype | string | json | The format of what is returned. Currently the default is JSON and only JSON works.
| api_key | string | DEMO_KEY | api.data.gov key for expanded usage

## Status
Insight: Mars Weather Service API is currently down. Please visit https://api.nasa.gov for more information.
