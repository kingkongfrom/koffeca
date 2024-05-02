import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Error from "./ui/Error";
import StoreLayout from "./layouts/StoreLayout.jsx";
import FrontStorePage from "./pages/FrontStorePage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminPage from "./pages/AdminPage.jsx";

function App() {
    const router = createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <Error />,
            children: [{ path: "/", element: <LandingPage /> }],
        },
        {
            element: <StoreLayout />,
            errorElement: <Error />,
            children: [{ path: "/store", element: <FrontStorePage /> }],
        },
        {
            element: <AdminLayout />,
            errorElement: <Error />,
            children: [{ path: "/admin", element: <AdminPage /> }],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
