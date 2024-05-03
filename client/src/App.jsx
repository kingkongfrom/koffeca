import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout.jsx";
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
import VarietiesPage from "./pages/VarietiesPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import { loader as coffeeLoader } from "./pages/FrontStorePage";

function App() {
    const router = createBrowserRouter([
        {
            element: <LandingLayout />,
            errorElement: <Error />,
            children: [{ path: "/", element: <LandingPage /> }],
        },
        {
            element: <AppLayout />,
            errorElement: <Error />,
            children: [{ path: "/varieties", element: <VarietiesPage /> }],
        },
        {
            element: <StoreLayout />,
            errorElement: <Error />,
            children: [
                {
                    path: "/store",
                    loader: coffeeLoader,
                    element: <FrontStorePage />,
                },
            ],
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
