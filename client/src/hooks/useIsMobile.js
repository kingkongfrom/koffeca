/**
 * Custom React hook to determine if the current device is a mobile device based on the window width.
 * @returns {boolean} Returns true if the current device is a mobile device (screen width <= 768 pixels), otherwise returns false.
 */
import { useEffect, useState } from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.innerWidth <= 768; // returns true if device screen <= 768, can be adjusted as needed
            setIsMobile(isMobileDevice);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize); // Removing event listener on component unmount
    }, []);
    return isMobile; // true or false
};