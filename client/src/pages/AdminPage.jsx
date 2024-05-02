import { Outlet } from "react-router-dom";

const AdminPage = () => {
    return (
        <div>
            <div className="bg-colorPrimary100 h-dvh flex-1 flex-grow">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;
