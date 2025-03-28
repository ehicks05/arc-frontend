import './index.css';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from '@supabase/auth-ui-react';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from 'react-modal-hook';
import { BrowserRouter } from 'react-router-dom';

import App from './MyApp';
import { supabase } from './supabase';

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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // getPosts: offsetLimitPagination(),
          getPosts: {
            keyArgs: ['sort'],
            merge(existing, incoming, { args }) {
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < incoming.length; ++i) {
                merged[args?.offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
});

const container = document.getElementById('root') as Element;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Auth.UserContextProvider supabaseClient={supabase}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </ApolloProvider>
  </Auth.UserContextProvider>,
);
