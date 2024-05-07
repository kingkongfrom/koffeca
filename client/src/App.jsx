import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingLayout from "./layouts/LandingLayout";
import LandingPage from "./pages/LandingPage";
import Error from "./ui/Error";
import StoreLayout from "./layouts/StoreLayout";
import FrontStorePage, { loader as coffeeLoader } from "./pages/FrontStorePage";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./features/admin/Dashboard";
import Inventory from "./features/admin/inventory/Inventory";
import Products from "./features/admin/Products/Products";
import Settings from "./features/admin/Settings";
import ProducersPage from "./pages/ProducersPage";
import AppLayout from "./layouts/AppLayout";
import CreateProduct, {
    action as createProduct,
} from "./features/admin/Products/CreateProduct";

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
            children: [{ path: "/varieties", element: <ProducersPage /> }],
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
                        {
                            path: "inventory",
                            loader: coffeeLoader,
                            element: <Inventory />,
                        },
                        {
                            path: "products",
                            loader: coffeeLoader,
                            element: <Products />,
                        },
                        {
                            path: "product/new",
                            loader: coffeeLoader,
                            action: createProduct,
                            element: <CreateProduct />,
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
