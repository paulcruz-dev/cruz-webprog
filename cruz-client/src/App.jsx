import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layout & Pages
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // cleaner than path: ''
        element: <HomePage />,
      },
      {
        path: 'about', // remove leading slash
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;