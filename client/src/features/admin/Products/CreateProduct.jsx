import { FaXmark } from "react-icons/fa6";
import DragAndDrop from "../../../ui/DragAndDrop.jsx";
import { capitalizeUppercase } from "../../../utils/capitalizeUppercase.js";
import { Form, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import supabase from "../../../services/supabase.js";

const supabaseUrl = "https://tferhpantilxkusofrfv.supabase.co";

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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        producer: "",
        variety: "",
        roast: "",
        weight: "",
        grinding: "",
        price: "",
        region: "",
        process: "",
        description: "",
        taste: "",
        quantity: 1,
        images: [], // Array to store image URLs
    });

    // Function to handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // If the field is "price", format the price value
        const updatedValue = name === "price" ? formatPrice(value) : value;
        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setFormData({
            ...formData,
            quantity: newQuantity,
        });
    };

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

    const handleImageDrop = async (files) => {
        const imageUrls = [];
        console.log("Uploading files:", files);
        try {
            for (const file of files) {
                // Decode the base64-encoded image data
                const imageData = atob(file.data.split(",")[1]);
                const byteArray = new Uint8Array(imageData.length);
                for (let i = 0; i < imageData.length; i++) {
                    byteArray[i] = imageData.charCodeAt(i);
                }
                const blob = new Blob([byteArray], { type: "image/png" });

                const { data, error } = await supabase.storage
                    .from("coffee")
                    .upload(file.name, blob, {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: "image/png",
                    });

                if (error) {
                    console.error("Error uploading file:", error.message);
                } else {
                    console.log("Uploaded image data:", data);
                    const imageUrl = `${supabaseUrl}/storage/v1/object/public/coffee/${data.path}`;
                    imageUrls.push(imageUrl);

                    console.log("Image array:", imageUrls);
                }
            }
            console.log("Image array set in state:", imageUrls);

            setFormData((prevFormData) => ({
                ...prevFormData,
                images: imageUrls,
            }));
        } catch (error) {
            console.error("Error handling image drop:", error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:3000/api/v1/coffee";
        const name = `${formData.producer} ${formData.variety}`;

        try {
            // Validate form data before submission
            const isFormValid = validateFormData(formData);
            if (!isFormValid) {
                // Handle invalid form data (e.g., display error message to user)
                console.error("Form data is invalid.");
                return;
            }

            // Upload images and get their URLs
            const imageUrls = formData.images;
            console.log("boom?", imageUrls);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    name: name,
                    images: imageUrls, // Include the image URLs in the JSON body
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            // Optionally handle success response
            const data = await response.json();
            console.log("Form submitted successfully:", data);

            // Clear the form after successful submission
            resetFormData();
        } catch (error) {
            console.error("Error submitting form:", error);
            // Optionally handle error state or display error message to the user
        }
        navigate("admin/products");
    };

    // Function to validate form data
    const validateFormData = (formData) => {
        // Check if all required fields are present and non-empty
        const requiredFields = [
            "producer",
            "variety",
            "roast",
            "weight",
            "grinding",
            "price",
            "region",
            "process",
            "description",
            "taste",
            "quantity",
            "images",
        ];
        for (const field of requiredFields) {
            if (!formData[field]) {
                return false; // Validation failed
            }
        }
        return true; // Validation passed
    };

    // Function to reset form data after successful submission
    const resetFormData = () => {
        setFormData({
            producer: "",
            variety: "",
            roast: "",
            weight: "",
            grinding: "",
            price: "",
            region: "",
            process: "",
            description: "",
            taste: "",
            quantity: 1,
            images: [],
        });
    };

    return (
        <div className="z-50">
            <div className="text-md flex h-12 w-full items-center justify-between bg-base-bone font-semibold">
                <h1 className="px-4">Add a new coffee product</h1>
                <div className="mt-1 cursor-pointer px-2 text-base-darb-dark-brown">
                    <button onClick={onClose}>
                        <FaXmark size={30} />
                    </button>
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex">
                        <label className="mr-3">Producer:</label>
                        <input
                            type="text"
                            id="producer"
                            name="producer"
                            placeholder="Don Cayito"
                            value={formData.producer}
                            onChange={handleChange}
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
                            value={formData.variety}
                            onChange={handleChange}
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
                                        checked={formData.roast === roastOption}
                                        onChange={handleChange}
                                        className="ml-4 mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300
                            checked:border-transparent checked:bg-base-bone focus:outline-none focus:ring-2 focus:ring-base-bone focus:ring-offset-2"
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
                                        checked={
                                            formData.weight === weightOption
                                        }
                                        onChange={handleChange}
                                        className="ml-4 mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300
                            checked:border-transparent checked:bg-base-bone focus:outline-none focus:ring-2 focus:ring-base-bone focus:ring-offset-2"
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
                                        checked={
                                            formData.grinding === grindingOption
                                        }
                                        onChange={handleChange}
                                        className="ml-4 mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300
                            checked:border-transparent checked:bg-base-bone focus:outline-none focus:ring-2 focus:ring-base-bone focus:ring-offset-2"
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
                            value={formData.price}
                            onChange={handleChange}
                            className="w-24 border-b border-gray-200 px-2 outline-none focus:border-blue-300"
                        />
                    </div>
                    <div className="flex flex-grow items-center gap-4">
                        <label htmlFor="quantity" className="">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min={1}
                            max={100}
                            value={formData.quantity}
                            onChange={handleQuantityChange}
                            className="w-20 px-2 text-left font-semibold"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="region" className="mr-[18px]">
                            Region:
                        </label>
                        <select
                            id="region"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
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
                            value={formData.process}
                            onChange={handleChange}
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
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 p-2 outline-none focus:border-blue-300"
                        />
                    </div>
                    <div className="">
                        <textarea
                            id="taste"
                            name="taste"
                            placeholder="Taste..."
                            rows="2"
                            value={formData.taste}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 p-2 outline-none focus:border-blue-300"
                        />
                    </div>

                    <DragAndDrop handleImageDrop={handleImageDrop} />
                </div>
                <div className="flex px-6 pb-4">
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
                    >
                        Add product to inventory
                    </button>
                </div>
            </Form>
        </div>
    );
};

// Define the action function to handle form submission
export const action = async ({ request }) => {
    // Here you can implement the logic to submit the form data to the server
    // For now, let's log the form data and return a dummy result
    console.log("Form data submitted:", request);
    // Return a dummy result for now
    return {
        success: true,
        data: request, // Return the submitted form data
    };
};

export default CreateProduct;
