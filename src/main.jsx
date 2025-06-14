import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Enable persistence
const localStoragePersistor = createSyncStoragePersister({ 
  storage: window.localStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
});

persistQueryClient({
  queryClient,
  persister: localStoragePersistor,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);