import { useIsMobile } from "../hooks/useIsMobile.js";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const isMobile = useIsMobile();
    const navItems = [
        { name: "DASHBOARD", path: "dashboard" },
        { name: "INVENTORY", path: "inventory" },
        { name: "PRODUCTS", path: "products" },
        { name: "SETTINGS", path: "settings" },
    ];

    return (
        <div className="flex h-full flex-col">
            <ul className="flex flex-col divide-y divide-stone-200 border-b-[1px]">
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        className="flex cursor-pointer justify-center py-4 transition-colors duration-300 hover:bg-stone-100 md:justify-start md:px-7"
                    >
                        <Link to="#">
                            {!isMobile ? (
                                item.name
                            ) : (
                                <span className="text-[10px]">{item.name}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Sidebar;
