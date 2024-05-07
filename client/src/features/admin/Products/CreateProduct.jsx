import { Form } from "react-router-dom";

import { capitalizeUppercase } from "../../../utils/capitalizeUppercase.js";
import React, { Fragment, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Slider from "../../../ui/Slider.jsx";
import DragAndDrop from "../../../ui/DragAndDrop.jsx";

const roast = ["CLARO", "MEDIO", "OSCURO"];
const weight = ["200g", "340g", "500g"];
const grinding = ["GRANO ENTERO", "MOLIDO"];
const region = [
    "VALLE CENTRAL",
    "TRES RIOS",
    "TURRIALBA",
    "BRUNCA",
    "GUANACASTE",
    "TARRAZU",
    "OROSI",
    "VALLE ORIENTAL",
];
const process = ["LAVADO", "NATURAL", "HONEY", "RED HONEY"];

const CreateProduct = ({ onClose }) => {
    const [price, setPrice] = useState("");

    // Function to format the price value
    const formatPrice = (value) => {
        // Remove non-numeric characters from input value
        const numericValue = value.replace(/[^\d]/g, "");
        // Check if numericValue is empty or NaN
        if (!numericValue || isNaN(parseInt(numericValue, 10))) {
            return "";
        }
        // Format the numeric value to include currency symbol and commas
        return new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0,
        }).format(parseInt(numericValue, 10));
    };

    // Function to handle input change
    const handlePriceChange = (event) => {
        // Get the raw input value
        const rawValue = event.target.value;
        // Format the input value
        const formattedValue = formatPrice(rawValue);
        // Update the state with the formatted value
        setPrice(formattedValue);
    };
    return (
        <div className="z-50">
            <div className="bg-base-bone text-md flex h-12 w-full items-center justify-between font-semibold">
                <h1 className="px-4">Add a new coffee product</h1>
                <div className="text-base-darb-dark-brown mt-1 cursor-pointer px-2">
                    <button onClick={onClose}>
                        <FaXmark size={30} />
                    </button>
                </div>
            </div>

            <Form method="POST">
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex">
                        <label className="mr-3">Producer:</label>
                        <input
                            type="text"
                            id="producer"
                            name="producer"
                            placeholder="Don Cayito"
                            className="border-b border-gray-200 px-2 outline-none focus:border-blue-300"
                        />
                    </div>
                    <div className="flex">
                        <label className="mr-3">Variety:</label>
                        <input
                            type="text"
                            id="variety"
                            name="variety"
                            placeholder="Bourbon / Geisha / Moka..."
                            className="border-b border-gray-200 px-2 outline-none focus:border-blue-300"
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="mr-3">Roast:</label>
                        <div className="flex">
                            {roast.map((roastOption) => (
                                <Fragment key={roastOption}>
                                    <input
                                        type="radio"
                                        id={roastOption}
                                        name="roast"
                                        value={roastOption}
                                        className="checked:bg-base-bone focus:ring-base-bone ml-4 mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-full
                                        border border-gray-300 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    />
                                    <label
                                        htmlFor={roastOption}
                                        className="select-none"
                                    >
                                        {capitalizeUppercase(roastOption)}
                                    </label>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className="mr-3">Weight:</label>
                        <div>
                            {weight.map((weightOption) => (
                                <Fragment key={weightOption}>
                                    <input
                                        type="radio"
                                        id={weightOption}
                                        name="weight"
                                        value={weightOption}
                                        className="checked:bg-base-bone focus:ring-base-bone ml-4 mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-full
                                        border border-gray-300 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    />
                                    <label
                                        htmlFor={weightOption}
                                        className="select-none"
                                    >
                                        {capitalizeUppercase(weightOption)}
                                    </label>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="mr-3">Grinding:</label>
                        <div>
                            {grinding.map((grindingOption) => (
                                <Fragment key={grindingOption}>
                                    <input
                                        type="radio"
                                        id={grindingOption}
                                        name="grinding"
                                        value={grindingOption}
                                        className="checked:bg-base-bone focus:ring-base-bone ml-4 mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-full
                                        border border-gray-300 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    />
                                    <label
                                        htmlFor={grindingOption}
                                        className="select-none"
                                    >
                                        {capitalizeUppercase(grindingOption)}
                                    </label>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex">
                        <label className="mr-3">Price:</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="₡7,000"
                            className="w-24 border-b border-gray-200 px-2 outline-none focus:border-blue-300"
                            value={price}
                            onChange={handlePriceChange}
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="region" className="mr-[18px]">
                            Region:
                        </label>
                        <select
                            id="region"
                            name="region"
                            className="w-72 rounded-lg border border-stone-300 px-2 py-[3px]"
                        >
                            {region.map((regionOption) => (
                                <option
                                    key={regionOption}
                                    value={regionOption}
                                    className=""
                                >
                                    {capitalizeUppercase(regionOption)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="process" className="mr-3">
                            Process:
                        </label>
                        <select
                            id="process"
                            name="process"
                            className="w-72 rounded-lg border border-stone-300 px-2 py-[3px]"
                        >
                            {process.map((processOption) => (
                                <option
                                    key={processOption}
                                    value={processOption}
                                    className=""
                                >
                                    {capitalizeUppercase(processOption)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="">
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description..."
                            rows="5"
                            className="w-full rounded-lg border border-gray-200 p-2 outline-none focus:border-blue-300"
                        />
                    </div>

                    <div className="">
                        <textarea
                            id="taste"
                            name="taste"
                            placeholder="Taste..."
                            rows="2"
                            className="w-full rounded-lg border border-gray-200 p-2 outline-none focus:border-blue-300"
                        />
                    </div>

                    <div className="flex flex-grow gap-4">
                        <label>Quantity:</label>
                        <Slider initialValue={1} min={1} max={100} />
                    </div>
                    <DragAndDrop />
                </div>
            </Form>
        </div>
    );
};

export const action = async ({ request }) => {};
export default CreateProduct;
