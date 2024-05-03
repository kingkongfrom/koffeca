import React from "react";

const Card = ({ item }) => {
    const weightOptions = item.weight_options;
    const minPrice = Math.min(...weightOptions.map((option) => option.price));
    const maxPrice = Math.max(...weightOptions.map((option) => option.price));

    return (
        <div className="w-full min-w-28 p-2 md:w-full">
            <div className="max-w-[300px] overflow-hidden">
                <img
                    className="h-auto w-full object-cover"
                    src={item.image1}
                    alt={item.name}
                />
                <div className="px-4 py-2">
                    <div className="mb-1 text-center font-serif text-base font-light">
                        {item.name}
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-2">
                    <span className="rounded-full text-center font-serif text-base font-light text-stone-600">
                        {`₡${minPrice} - ₡${maxPrice} IVA incluido`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
