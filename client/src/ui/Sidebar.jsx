import { useIsMobile } from "../hooks/useIsMobile.js";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
    const isMobile = useIsMobile();
    const location = useLocation();
    const navItems = [
        { name: "DASHBOARD", path: "/admin/dashboard" },
        { name: "INVENTORY", path: "/admin/inventory" },
        { name: "PRODUCTS", path: "/admin/products" },
        { name: "SETTINGS", path: "/admin/settings" },
    ];

    return (
        <div className="min-h-auto flex flex-col bg-stone-200 md:min-h-full">
            <header className="flex h-12 w-auto items-center justify-center border-b border-b-stone-300 text-[10px] font-semibold md:text-[17px]">
                ADMIN PANEL
            </header>
            <ul className="flex flex-col divide-y divide-stone-300">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            className={`flex cursor-pointer justify-center py-4 tracking-wide 
                            transition-colors duration-300 md:justify-start md:px-7 ${location.pathname === item.path ? "bg-stone-100" : ""}`}
                        >
                            {!isMobile ? (
                                item.name
                            ) : (
                                <span className="px-4 text-[10px]">
                                    {item.name}
                                </span>
                            )}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
