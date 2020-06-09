import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { CONFIG } from './config';

const BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${CONFIG.SPACE_ID}`;

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: BASE_URL,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
    },
  }),
  ssrMode: true,
});
