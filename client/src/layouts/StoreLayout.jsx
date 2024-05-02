import { Outlet } from "react-router-dom";
import Navigation from "../ui/Navigation.jsx";

const StoreLayout = () => {
    return (
        <div>
            <Navigation color="text-stone-100" backgroundColor="bg-stone-800" />

            <main className="mx-auto min-h-screen overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};
export default StoreLayout;
