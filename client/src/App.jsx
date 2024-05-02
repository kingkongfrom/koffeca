import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Error from "./ui/Error";
import StoreLayout from "./layouts/StoreLayout.jsx";
import FrontStorePage from "./pages/FrontStorePage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Dashboard from "./features/admin/Dashboard.jsx";
import Inventory from "./features/admin/Inventory.jsx";
import Products from "./features/admin/Products.jsx";
import Settings from "./features/admin/Settings.jsx";

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
            children: [
                {
                    path: "/admin",
                    element: <AdminPage />,
                    children: [
                        { path: "dashboard", element: <Dashboard /> },
                        { path: "inventory", element: <Inventory /> },
                        { path: "products", element: <Products /> },
                        { path: "settings", element: <Settings /> },
                    ],
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
