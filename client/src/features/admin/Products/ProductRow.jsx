import React from "react";
import { capitalizeUppercase } from "../../../utils/capitalizeUppercase.js";
import EditButton from "../../../ui/EditButton.jsx";

const ProductRow = ({ data, keys, formatPrice, className }) => {
    return (
        <tr className={` divide-y font-[Lato] text-sm ${className}`}>
            {/* Render images first */}
            <td className="">
                {/* Check if "images" key exists and is not empty */}
                {data.images && data.images.length > 0 ? (
                    <img
                        src={data.images[0]}
                        alt="Product"
                        className="max-w-[55px]"
                    />
                ) : (
                    <div>No Image</div>
                )}
            </td>
            {/* Render remaining table cells with data */}
            {keys.map((key, index) => (
                <td key={index} className="px-4">
                    {key === "price"
                        ? formatPrice(data[key])
                        : capitalizeUppercase(data[key])}
                </td>
            ))}
            <td>
                <EditButton />
            </td>
        </tr>
    );
};

export default ProductRow;
