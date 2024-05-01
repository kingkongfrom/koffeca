import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Error from "./ui/Error"

function App() {
    const router = createBrowserRouter([
        {
            element: <AppLayout/>,
            errorElement: <Error/>,
            children: [
                { path: "/", element: <LandingPage/> }
            ]
        }
    ]);
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
