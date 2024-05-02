import Navigation from "../ui/Navigation.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            <Navigation color="text-stone-100" backgroundColor="bg-stone-800" />
            <main className="h-screen overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};
export default AdminLayout;
