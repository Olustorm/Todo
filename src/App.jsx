import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './router';

const queryClient = new QueryClient();

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
