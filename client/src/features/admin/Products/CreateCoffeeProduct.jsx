import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCoffee } from "../../../services/apiCoffee.js";
import { useDropzone } from "react-dropzone";
import slugify from "slugify";
import supabase from "../../../services/supabase.js";

const supabaseUrl = "https://tferhpantilxkusofrfv.supabase.co";

const coffeeVarieties = [
    "Bourbon",
    "Moka",
    "Catuai",
    "Typica",
    "Geisha",
    "Obata",
];

const roast = ["CLARO", "MEDIO", "OSCURO"];
const weight = ["200g", "340g", "500g", "1000g"];
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

const CreateCoffeeProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        producer: "",
        variety: "",
        roast: "",
        weight: "",
        price: "",
        grinding: "",
        region: "",
        process: "",
        description: "",
        taste: "",
        sku: "",
        quantity: 0,
        images: [], // Initialize images state
    });

    // Define images state variable
    const [images, setImages] = useState([]);

    const [uniqueProducers, setUniqueProducers] = useState([]);

    const getProducer = async () => {
        try {
            const { coffee } = await getAllCoffee();
            const uniqueProducersSet = new Set(
                coffee.map((item) => item.producer),
            );
            const uniqueProducersArray = Array.from(uniqueProducersSet);
            setUniqueProducers(uniqueProducersArray); // Set the state here
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getProducer();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/api/v1/coffee";
        const name = `Coffee ${formData.producer} ${formData.variety}`;
        const sku = slugify(
            `${formData.producer} ${formData.roast} ${formData.process}`,
        );

        try {
            // Upload images to Supabase and get the image URLs
            const supabaseImageURLs = await uploadImagesToSupabase(images);

            // Combine Supabase image URLs with the existing image URLs
            const allImageURLs = [...formData.images, ...supabaseImageURLs];

            // Build the form data to be submitted to the server
            const formDataWithImages = {
                ...formData,
                images: allImageURLs,
                name,
                sku,
            };

            // Make a POST request to the server endpoint
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataWithImages),
            });

            // Check if the request was successful
            if (!response.ok) {
                // Extract error message from response if available
                let errorMessage = "Failed to submit form data to server";
                try {
                    const responseData = await response.json();
                    if (responseData && responseData.error) {
                        errorMessage = responseData.error.message;
                    }
                } catch (error) {
                    console.error("Error parsing response:", error);
                }
                throw new Error(errorMessage);
            }

            // Redirect or perform any other action after successful form submission
            // navigate('/success');
        } catch (error) {
            console.error("Error submitting form data:", error.message);
            // Handle error (e.g., display error message to user)
            // You can display the error message to the user using an alert or by updating state to show error message in the UI
            // For example:
            // setError(error.message);
        }
    };

    const uploadImagesToSupabase = async (images) => {
        const imageUrls = [];

        // Loop through each image and upload it to Supabase
        for (const image of images) {
            // Example: upload image to Supabase
            const { data, error } = await supabase.storage
                .from("coffee") // Use your bucket name here
                .upload(image.file.name, image.file);

            if (error) {
                console.error("Error uploading image:", error.message);
            } else {
                console.log("Image uploaded successfully:", data);
                // Construct the image URL using the specified format
                const imageUrl = `${supabaseUrl}/storage/v1/object/public/coffee/${image.file.name}`;
                // Push the image URL to the array
                imageUrls.push(imageUrl);
            }
        }

        return imageUrls; // Return the array of image URLs
    };

    const onDrop = (acceptedFiles) => {
        // Ensure only up to 3 images are selected
        if (images.length + acceptedFiles.length > 3) {
            alert("You can upload up to 3 images.");
            return;
        }

        // Create an array of objects with files
        const updatedImages = acceptedFiles.map((file) => ({
            file,
            name: `${formData.producer}_${formData.variety}_${formData.process}_${images.length + 1}`, // Naming convention
        }));

        // Update the images state
        setImages((prevImages) => [...prevImages, ...updatedImages]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    return (
        <div className="">
            <h1>Create a new coffee product</h1>
            <form
                onSubmit={handleSubmit}
                className="flex max-w-full flex-col rounded-lg bg-stone-200 p-6 md:max-w-[700px]"
            >
                <div className="mb-4">
                    <select
                        id="producer"
                        name="producer"
                        value={formData.producer}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring"
                    >
                        <option value="">Select Producer</option>
                        {uniqueProducers.sort().map((producer, index) => (
                            <option key={index} value={producer}>
                                {producer}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <select
                        id="viriety"
                        name="variety"
                        value={formData.variety}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring"
                    >
                        <option value="">Select a variety</option>
                        {coffeeVarieties.sort().map((variety, index) => (
                            <option key={index} value={variety}>
                                {variety}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <select
                        id="roast"
                        name="roast"
                        value={formData.roast}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring"
                    >
                        <option value="">Select a roast</option>
                        {roast.map((roast, index) => (
                            <option key={index} value={roast}>
                                {roast}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 md:flex-row">
                    {weight.map((option, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="weight"
                                value={option}
                                checked={formData.weight === option}
                                onChange={handleChange}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row md:gap-4">
                    <div>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="₡ Price"
                            className="mt-4 max-w-40 rounded-md px-4 py-2 md:max-w-64"
                        />
                    </div>

                    <div className="mt-4 w-full">
                        <select
                            id="grinding"
                            name="grinding"
                            value={formData.grinding}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring"
                        >
                            <option value="">Select a grinding</option>
                            {grinding.map((grinding, index) => (
                                <option key={index} value={grinding}>
                                    {grinding}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-4 mt-4">
                    <select
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring"
                    >
                        <option value="">Select a region</option>
                        {region.sort().map((region, index) => (
                            <option key={index} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        id="process"
                        name="process"
                        value={formData.process}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none focus:ring"
                    >
                        <option value="">Select a process</option>
                        {process.sort().map((process, index) => (
                            <option key={index} value={process}>
                                {process}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="relative w-full">
                    <input
                        id="description"
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        className="h-14 w-full rounded-lg pl-8" // Add left padding to accommodate the placeholder
                        placeholder="Description" // Remove the placeholder attribute from here
                        dir="ltr" // Set the direction of the text input as left-to-right
                    />
                </div>

                <div className="relative mt-4 w-full">
                    <input
                        id="taste"
                        name="taste"
                        type="text"
                        value={formData.taste}
                        onChange={handleChange}
                        className="h-8 w-full rounded-lg pl-8" // Add left padding to accommodate the placeholder
                        placeholder="Taste" // Remove the placeholder attribute from here
                        dir="ltr" // Set the direction of the text input as left-to-right
                    />
                </div>

                {/* Image Upload Fields */}
                <div className="mt-4">
                    <div
                        {...getRootProps()}
                        className="mb-2 mt-2 cursor-pointer rounded-md border-2 border-dashed border-gray-400 p-4 "
                    >
                        <input {...getInputProps()} />
                        <p>
                            Drag 'n' drop some files here, or click to select
                            files
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image.file)}
                                alt={`Uploaded ${index}`}
                                className="mt-2 w-1/4 rounded-md"
                            />
                        ))}
                    </div>
                </div>

                {/* Add other form fields */}
                <div className="mt-6 flex justify-start gap-2">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-lg bg-cyan-700 px-3 py-1 text-white"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg bg-stone-500 px-3 py-1 text-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCoffeeProduct;
