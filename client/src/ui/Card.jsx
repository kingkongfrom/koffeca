import React from "react";

const Card = ({ item, priceRange }) => {
    // Ensure item and priceRange are valid
    if (!item || !priceRange) return null;

    // Check if the price range is repeated
    const displayPrice =
        priceRange[0] === priceRange[1]
            ? priceRange[0]
            : `${priceRange[0].toLocaleString()} - ₡${priceRange[1].toLocaleString()}`;

    // Choose the first image to display
    const imageUrl = item.images[0];
    console.log(item.images[0]);

    return (
        <div className="w-full min-w-28 md:w-full">
            <div className="max-w-[300px] overflow-hidden">
                <img
                    className="h-auto w-full object-cover"
                    src={imageUrl}
                    alt={item.name}
                />
                <div className="">
                    <div className="text-md mb-1 text-center font-extralight">
                        <p className="font-sans text-[15px]">
                            {item.name.toUpperCase()}
                        </p>
                        <p className="text-[16px]">{item.process}</p>
                    </div>
                    <div className="mt-1.5 flex items-center justify-center">
                        <span className="font-[lato] font-light">
                            <p>₡{displayPrice.toLocaleString()} IVA incluido</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
