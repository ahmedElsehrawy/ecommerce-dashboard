import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { endPoint } from "./config";
import { setContext } from "@apollo/client/link/context";
import { AuthVar } from "./initialState";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        user: {
          read() {
            return AuthVar();
          },
        },
      },
    },
  },
});

export const createApolloClient = () => {
  let token: string = "";

  const httpLink = createHttpLink({
    uri: endPoint,
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      token = JSON.parse(auth).token;
    }

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token.replaceAll('"', "")}` : token,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  });
};
