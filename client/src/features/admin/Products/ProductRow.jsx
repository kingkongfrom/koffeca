import React from "react";
import { capitalizeUppercase } from "../../../utils/capitalizeUppercase.js";
import { deleteCoffee } from "../../../services/apiCoffee.js";
import { useNavigate } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";

const ProductRow = ({ data, keys, formatPrice, className }) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        deleteCoffee(data._id)
            .then(() => {
                navigate("/admin/products");
                console.log("Product deleted successfully");
            })
            .catch((error) => {
                // Handle error, e.g., show an error message to the user
                console.error("Error deleting product:", error);
            });
    };

    return (
        <tr className={`divide-y font-[Lato] text-sm ${className}`}>
            {/* Render images first */}
            <td>
                {/* Check if "images" key exists and is not empty */}
                {data.images && data.images.length > 0 ? (
                    <div className="">
                        <img
                            src={data.images[0]}
                            alt="Product"
                            className="max-w-[55px]"
                        />
                    </div>
                ) : (
                    <div>No Image</div>
                )}
            </td>
            {/* Render remaining table cells with data */}
            {keys.map((key, index) => (
                <td
                    key={index}
                    className={
                        key === "image" ? "p-0" : "min-w-24 px-6 text-center"
                    }
                >
                    {key === "price"
                        ? formatPrice(data[key])
                        : capitalizeUppercase(data[key])}
                </td>
            ))}
            <td className="flex h-20 items-center justify-between gap-6 px-4 py-1">
                <FaBan
                    size={20}
                    className="cursor-pointer text-stone-500"
                    onClick={handleDelete}
                />
                <FaPenToSquare
                    size={20}
                    className="cursor-pointer text-stone-500"
                />
            </td>
        </tr>
    );
};

export default ProductRow;
