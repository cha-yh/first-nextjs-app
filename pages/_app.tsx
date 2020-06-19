import '../styles/global.css'
import { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'node-fetch'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.spacex.land/graphql',
    fetch
  })
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}