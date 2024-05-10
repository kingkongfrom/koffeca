import Navigation from "../ui/Navigation.jsx";
import Sidebar from "../ui/Sidebar.jsx";
import Search from "../ui/Search.jsx";
import AdminFooter from "../features/admin/AdminFooter.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navigation color="text-stone-100" backgroundColor="bg-stone-800" />

            <div className="flex flex-1 overflow-hidden">
                <div className="border-stone-150 w-[80px] border-r-[1px] bg-stone-50 md:w-[300px]">
                    <Sidebar />
                </div>
                <div className="flex w-full flex-col">
                    <Search />
                    <main className="flex-1 overflow-hidden rounded">
                        <Outlet />
                    </main>
                </div>
            </div>
            <AdminFooter />
        </div>
    );
};
export default AdminLayout;
