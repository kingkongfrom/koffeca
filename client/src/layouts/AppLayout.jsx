import { Outlet } from "react-router-dom";
import Navigation from "../ui/Navigation.jsx";

const AppLayout = () => {
    return (
        <div>
            <Navigation color="bg-stone-800"/>
            <Outlet/>
        </div>
    );
};
export default AppLayout;
