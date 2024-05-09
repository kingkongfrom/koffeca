import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navigation from "../ui/Navigation.jsx";
import Spinner from "../ui/Spinner.jsx";
import Footer from "../ui/Footer.jsx";

const StoreLayout = () => {
    const navigation = useNavigation();

    return (
        <div>
            <Navigation color="text-stone-100" backgroundColor="bg-stone-800" />
            <main className="mx-auto min-h-screen overflow-auto">
                {navigation.state === "loading" ? <Spinner /> : <Outlet />}
            </main>
            <Footer />
        </div>
    );
};
export default StoreLayout;
