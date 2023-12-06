import "./App.css";
// Imported Apollo GraphQL into App.JSX
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

//This sets our link for GraphQL
const httpLink = createHttpLink({
  uri: "/graphql",
});

//This is middleware to implement a token for every request.
//There's also a retrieval for a token if it exists within local storage.
//Headers are returned are returned if a token is present.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//Middleware for our GraphQL when we are using the const authLink variable.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//Added ApolloProvider to render Apollo GraphQL into the application.
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
