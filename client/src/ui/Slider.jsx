import React, { useRef, useState } from "react";

const QuantitySlider = ({ initialValue = 1, onChange, min = 1, max = 10 }) => {
    const [quantity, setQuantity] = useState(initialValue);
    const sliderRef = useRef(null);

    const handleInputChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= min && newQuantity <= max) {
            setQuantity(newQuantity);
            onChange(newQuantity);
        }
    };

    const handleSliderChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    return (
        <div className="flex w-full items-center gap-4">
            <input
                ref={sliderRef}
                type="range"
                className="w-full rounded-lg px-2 focus:outline-none"
                min={min}
                max={max}
                value={quantity}
                onChange={handleSliderChange}
            />
            <input
                type="number"
                className="w-20 px-2 py-1 text-center font-semibold focus:outline-none"
                value={quantity}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default QuantitySlider;
