import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';
import { Auth } from '@supabase/auth-ui-react';

import { supabase } from './supabase';
import App from './App';
import './index.css';

const authClient = supabase.auth;

const uri = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_GRAPHQL_URI
  : import.meta.env.VITE_DEV_GRAPHQL_URI;

/* Set URI for all Apollo GraphQL requests (backend api) */
const httpLink = new HttpLink({
  uri,
  fetchOptions: { credentials: 'same-origin' },
});

/* Create Apollo Link to supply token */
const withTokenLink = setContext(async () => ({
  authToken: (await authClient?.getSession())?.data?.session?.access_token,
}));

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
const renderApp = (Component: () => JSX.Element) => {
  render(
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ModalProvider>
            <Component />
          </ModalProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Auth.UserContextProvider>,
    document.getElementById('root'),
  );
};

renderApp(App);
