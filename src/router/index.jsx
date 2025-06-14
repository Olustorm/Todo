import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import TodoDetail from '../pages/TodoDetail';
import NotFound from '../pages/NotFound';
import ErrorTest from '../pages/ErrorTest';
import ErrorBoundary from '../components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/todos/:id',
    element: <TodoDetail />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/error',
    element: <ErrorTest />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;

