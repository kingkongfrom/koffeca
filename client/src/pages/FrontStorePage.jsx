import { getAllCoffee } from "../services/apiCoffee.js";
import Card from "../ui/Card.jsx";
import { useLoaderData } from "react-router-dom";

const FrontStorePage = () => {
    const { coffee } = useLoaderData(); // Extract the coffee array from the object

    // Check if coffee is an array before mapping over it
    if (!Array.isArray(coffee)) {
        console.error("Coffee data is not an array:", coffee);
        return null;
    }

    return (
        <div className="flex w-full items-center justify-center">
            <div className="mt-8 grid grid-cols-1 gap-9 sm:grid-cols-2 md:max-w-[1400px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {coffee.map((item) => (
                    <div
                        key={item._id}
                        className="w-full cursor-pointer md:w-auto"
                    >
                        <Card item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const loader = async () => {
    try {
        const { coffee } = await getAllCoffee();
        return { coffee };
    } catch (error) {
        console.error("Error fetching coffee data:", error);
        return { coffee: [] };
    }
};

export default FrontStorePage;
