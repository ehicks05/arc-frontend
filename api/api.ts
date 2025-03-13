import { eventHandler, getRequestURL, readRawBody } from 'vinxi/http';
import { yoga } from './src/app';

export default eventHandler(async event => {
  const url = getRequestURL(event);

  const response = await yoga.fetch(
    url,
    {
      method: event.method,
      headers: event.headers,
      body: await readRawBody(event, false),
    },
    // ctx
  );

  return response.json();
});
