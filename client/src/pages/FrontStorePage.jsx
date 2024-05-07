import React from "react";
import { getAllCoffee } from "../services/apiCoffee.js";
import Card from "../ui/Card.jsx";
import { useLoaderData } from "react-router-dom";

const FrontStorePage = () => {
    const { coffee } = useLoaderData() || { coffee: [] }; // Ensure coffee is initialized

    // Ensure coffee is an array before further processing
    if (!Array.isArray(coffee)) {
        console.error("Coffee data is not an array:", coffee);
        return null;
    }

    // Group coffee by name
    const groupedByName = coffee.reduce((acc, curr) => {
        acc[curr.name] = acc[curr.name] || [];
        acc[curr.name].push(curr);
        return acc;
    }, {});

    // Calculate price range for each unique product
    const productsWithPriceRange = Object.entries(groupedByName).map(
        ([name, products]) => {
            const prices = products.map((product) => product.price);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            return { name, priceRange: [minPrice, maxPrice] };
        },
    );

    // Render unique items
    return (
        <div className="flex w-full items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:max-w-[1400px] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {productsWithPriceRange.map((product) => (
                    <div key={product.name}>
                        <Card
                            item={groupedByName[product.name][0]} // Take the first item for display
                            priceRange={product.priceRange}
                        />
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
