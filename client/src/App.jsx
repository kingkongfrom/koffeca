import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import LandingPage from "./pages/LandingPage";
import Error from "./ui/Error";
import StoreLayout from "./layouts/StoreLayout";
import StorePage, { loader as coffeeLoader } from "./pages/StorePage.jsx";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./features/admin/dashboard/Dashboard.jsx";
import Inventory from "./features/admin/inventory/Inventory";
import Products from "./features/admin/Products/Products";
import Settings from "./features/admin/Settings";
import AccessoriesPage from "./pages/AccessoriesPage.jsx";
import AppLayout from "./layouts/AppLayout";
import { action as createProduct } from "./features/admin/Products/CreateProduct";

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
            children: [{ path: "/accessories", element: <AccessoriesPage /> }],
        },
        {
            element: <StoreLayout />,
            errorElement: <Error />,
            children: [
                {
                    path: "/store",
                    loader: coffeeLoader,
                    element: <StorePage />,
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
                        {
                            path: "inventory",
                            loader: coffeeLoader,
                            element: <Inventory />,
                        },
                        {
                            path: "products",
                            loader: coffeeLoader,
                            action: createProduct,
                            element: <Products />,
                        },
                        {
                            path: "products/:id",
                            loader: coffeeLoader,
                        },
                        { path: "settings", element: <Settings /> },
                    ],
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
