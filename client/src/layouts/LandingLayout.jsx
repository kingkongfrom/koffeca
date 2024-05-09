import { Outlet } from "react-router-dom";
import Hero from "../ui/Hero.jsx";
import Footer from "../ui/Footer.jsx";

function Header() {
    return null;
}

const LandingLayout = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <div className="flex-grow overflow-hidden">
                <main className="mx-auto min-h-screen max-w-5xl overflow-auto">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};
export default LandingLayout;
