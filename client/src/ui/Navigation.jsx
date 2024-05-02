import { useIsMobile } from "../hooks/useIsMobile.js";
import { Fragment, useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Navigation = ({ color, backgroundColor }) => {
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
        <nav
            className={`flex h-24 items-center justify-between px-6 ${color} ${backgroundColor}`}
        >
            <Link to="/">
                <Logo width={90} height={90} />
            </Link>

            <button
                onClick={toggleMobileMenu}
                className={`z-50 block md:hidden ${showMobileMenu ? "hidden" : ""}`}
            >
                <FaBars size={30} />
            </button>

            {showMobileMenu && isMobile && (
                <div
                    className="bg-colorPrimary fixed right-0 top-0 z-50 flex min-h-screen w-full translate-x-0
                     transform items-center justify-center bg-stone-800 bg-opacity-50 shadow-lg
                     backdrop-blur-lg"
                >
                    <div className="mb-[150px] flex flex-col gap-4 text-center">
                        <NavLink
                            to="/"
                            className={`text-2xl ${
                                showMobileMenu ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={closeMobileMenu}
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/store"
                            className={`text-2xl ${showMobileMenu ? "opacity-100" : "opacity-0"}`}
                            onClick={closeMobileMenu}
                        >
                            Tienda
                        </NavLink>
                        <NavLink
                            to="#"
                            className={`text-2xl ${
                                showMobileMenu ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={closeMobileMenu}
                        >
                            Contacto
                        </NavLink>
                        <NavLink
                            to="/admin"
                            className={`text-2xl ${
                                showMobileMenu ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={closeMobileMenu}
                        >
                            Cuenta
                        </NavLink>
                    </div>

                    <button
                        onClick={toggleMobileMenu}
                        className="absolute right-2 top-[30px] mr-4 mt-1"
                    >
                        <FaX size={30} />
                    </button>
                </div>
            )}
            {!isMobile && (
                <Fragment>
                    <div className="text-md flex gap-24">
                        <NavLink to="/" className="">
                            Inicio
                        </NavLink>
                        <NavLink to="/store" className="">
                            Tienda
                        </NavLink>
                        <NavLink to="#" className="">
                            Contacto
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/admin" className="text-lg">
                            <FaRegUserCircle
                                size={20}
                                className="hover:rounded-full hover:ring-2 hover:ring-white"
                            />
                        </NavLink>
                    </div>
                </Fragment>
            )}
        </nav>
    );
};
export default Navigation;
