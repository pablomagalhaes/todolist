import '../styles/globals.css';
import { ApolloProvider } from "@apollo/client";
import client from '../lib/apolloClient';
import { AppProps } from 'next/app';
import { ToDoProvider } from '../context/ToDoContext'; // Importa o ToDoProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ToDoProvider> {/* Envolva o aplicativo com o ToDoProvider */}
        <Component {...pageProps} />
      </ToDoProvider>
    </ApolloProvider>
  );
}

export default MyApp;
