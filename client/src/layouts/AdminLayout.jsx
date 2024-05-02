import Navigation from "../ui/Navigation.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar.jsx";
import Search from "../features/admin/Search.jsx";

const AdminLayout = () => {
    return (
        <div>
            <Navigation color="text-stone-100" backgroundColor="bg-stone-800" />

            <div className="flex h-screen overflow-hidden">
                <div className="border-stone-150 bg-colorPrimary150  min-h-[640px] w-[80px] border-r-[1px] md:h-dvh md:w-[300px]">
                    <Sidebar />
                </div>
                <div className="w-full">
                    <Search />
                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};
export default AdminLayout;
