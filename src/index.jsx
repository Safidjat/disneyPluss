import { createRoot } from 'react-dom/client'
import './index.css'
import './font.css'
import App from './App.jsx'
import PageNotFoundError from './pages/PageNotFoundError/index.jsx';
import MainLayout from './layout/MainLayout.jsx';
import Landing from './pages/Landing/index.jsx';
import Auth from './pages/Auth/index.jsx';
import Categories from './pages/Categories/index.jsx';
import Detail from './pages/Detail/index.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

    // <BrowserRouter>
    //     <App />
    // </BrowserRouter>
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <PageNotFoundError />,
            children: [
                {
                    element: <MainLayout />,
                    children: [
                        {
                            index: true, 
                            element: <Landing />
                        },
                        {
                            path: '/auth',
                            element: <Auth />
                        },
                        {
                            path: '/category/:id',
                            element: <Categories />
                        },
                        {
                            path: '/detail/:id',
                            element: <Detail />
                        }
                    ]
                },
                {
                    path: '*',
                    element: <PageNotFoundError />
                }
            ]
        },
    ]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
