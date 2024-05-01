import { useIsMobile } from "../hooks/useIsMobile.jsx";
import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";

const Navigation = ({ color }) => {
    const isMobile = useIsMobile();
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu((prevState) => !prevState);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (!isMobile) {
                setShowMobileMenu(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMobile]);

    useEffect(() => {
        document.body.style.overflow = showMobileMenu ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [showMobileMenu]);

    return (
        <nav className={`flex h-24 items-center justify-between px-6 ${color}`}>
            <Logo width={90} height={90}/>
        </nav>
    );
};
export default Navigation;
