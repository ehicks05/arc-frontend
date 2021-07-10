import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUDIENCE}
      scope={"read:whatever"}
    >
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
