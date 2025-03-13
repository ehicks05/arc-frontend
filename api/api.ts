import { eventHandler, getRequestURL, readRawBody } from 'vinxi/http';
import { yoga } from './src/app';

export default eventHandler(async event => {
  const url = getRequestURL(event);
  const body = await readRawBody(event, false);

  const response = await yoga.fetch(
    url,
    {
      method: event.method,
      headers: event.headers,
      body,
    },
    // ctx
  );

  return response.json();
});
