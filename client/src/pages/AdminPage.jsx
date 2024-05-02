import Sidebar from "../ui/Sidebar.jsx";

const AdminPage = () => {
    return (
        <div className="flex">
            <div className="border-stone-150 bg-colorPrimary150  min-h-[640px] w-[80px] border-r-[1px] md:h-dvh md:w-[300px]">
                <Sidebar />
            </div>
            <div className="bg-colorPrimary100 h-dvh flex-1 flex-grow">
                {/* Content for the right div */}
            </div>
        </div>
    );
};

export default AdminPage;
