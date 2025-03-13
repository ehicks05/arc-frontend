import { eventHandler, getRequestHeaders } from "vinxi/http";

export default eventHandler(async (event) => {
  const headers = getRequestHeaders(event); 

  return {message: 'turtles', headers};
});