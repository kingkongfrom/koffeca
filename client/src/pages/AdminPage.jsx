import { Outlet } from "react-router-dom";

const AdminPage = () => {
    return (
        <div className="m-3 min-h-[510px] flex-1 rounded-lg bg-stone-100 p-2 md:min-h-dvh">
            <Outlet />
        </div>
    );
};

export default AdminPage;
