import { RouterProvider } from 'react-router';
import './App.css';
import AppRouter from './route/AppRouter';
import { ApolloProvider } from '@apollo/client';
import client from './constants/apollo-client';
import { Guard } from './guards';

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Guard>
          <>
            <RouterProvider router={AppRouter} />
          </>
        </Guard>
      </ApolloProvider>
    </>
  );
}

export default App;
