import { eventHandler, getRequestURL, readRawBody } from 'vinxi/http';
import { yoga } from './src/app';

export default eventHandler(async event => {
  const url = getRequestURL(event);
  const body = await readRawBody(event, false);

  console.time('yoga');
  const response = await yoga.fetch(
    url,
    {
      method: event.method,
      headers: event.headers,
      body,
    },
    // ctx
  );
  console.timeEnd('yoga');

  return response.json();
});
