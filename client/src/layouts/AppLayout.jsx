import { Outlet } from "react-router-dom";
import Hero from "../ui/Hero.jsx";

function Header() {
    return null;
}

const AppLayout = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <div className="flex-grow overflow-hidden">
                <main className="mx-auto min-h-screen max-w-5xl overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default AppLayout;
