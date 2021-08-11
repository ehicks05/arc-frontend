import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-supabase";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import { Auth } from "@supabase/ui";

import { supabase } from "./supabase";
import App from "./App";
import "./index.css";

const authClient = supabase.auth;

/* Set URI for all Apollo GraphQL requests (backend api) */
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  fetchOptions: { credentials: "same-origin" },
});

/* Set in-memory token to reduce async requests */
let token;

/* Create Apollo Link to supply token */
const withTokenLink = setContext(() => {
  // return token if there
  if (token) return { authToken: token };

  // else check if valid token exists with client already and set if so
  let newToken;
  try {
    newToken = authClient.session().access_token;
    console.log(newToken);
  } catch (err) {
    console.log("make login optional: " + err);
  }
  token = newToken;
  return { authToken: newToken };
});

/* Create Apollo Link to supply token in auth header with every gql request */
const authLink = setContext((_, { headers, authToken }) => ({
  headers: {
    ...headers,
    ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
  },
}));

/* Create Apollo Client */
const client = new ApolloClient({
  link: ApolloLink.from([withTokenLink, authLink, httpLink]),
  cache: new InMemoryCache({}),
});

/* Create root render function */
const renderApp = (Component) => {
  render(
    <ApolloProvider client={client}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Provider value={supabase}>
          <BrowserRouter>
            <ModalProvider>
              <App />
            </ModalProvider>
          </BrowserRouter>
        </Provider>
      </Auth.UserContextProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );
};

renderApp(App);
