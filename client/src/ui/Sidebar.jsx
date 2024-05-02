import { useIsMobile } from "../hooks/useIsMobile.js";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const isMobile = useIsMobile();
    const navItems = [
        { name: "DASHBOARD", path: "/admin/dashboard" },
        { name: "INVENTORY", path: "/admin/inventory" },
        { name: "PRODUCTS", path: "/admin/products" },
        { name: "SETTINGS", path: "/admin/settings" },
    ];

    return (
        <div className="flex h-full flex-col">
            <ul className="flex flex-col divide-y divide-stone-200 border-b-[1px]">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            className="flex cursor-pointer justify-center py-4 tracking-wide transition-colors duration-300 hover:bg-stone-100
                        md:justify-start md:px-7"
                        >
                            {!isMobile ? (
                                item.name
                            ) : (
                                <span className="px-4 text-[10px]">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Sidebar;
