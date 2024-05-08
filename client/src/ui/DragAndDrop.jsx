import React, { useState } from "react";

const DragAndDrop = ({ handleImageDrop }) => {
    const [droppedImages, setDroppedImages] = useState([]);
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const imageFiles = files.filter((file) =>
            file.type.startsWith("image/"),
        );

        const remainingSlots = 3 - droppedImages.length;
        const filesToAdd = imageFiles.slice(0, remainingSlots);

        const imagePromises = filesToAdd.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        name: file.name,
                        data: reader.result,
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises).then((images) => {
            setDroppedImages([...droppedImages, ...images]);
            handleImageDrop([...droppedImages, ...images]); // Update parent state
        });
    };

    const handleImageRemove = (index) => {
        const newImages = [...droppedImages];
        newImages.splice(index, 1);
        setDroppedImages(newImages);
        handleImageDrop(newImages); // Update parent state
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative flex min-h-[100px] w-full flex-row flex-wrap items-start justify-start
            gap-2 overflow-auto border-4 border-dashed border-gray-300 p-2"
        >
            {droppedImages.map((image, index) => (
                <div key={index} className="relative">
                    <img
                        src={image.data}
                        alt={`Dropped ${index}`}
                        className="m-5 max-h-[100px] max-w-full cursor-pointer"
                        onClick={() => handleImageRemove(index)}
                    />
                    <div
                        className="absolute right-4 top-1 cursor-pointer p-2"
                        onClick={() => handleImageRemove(index)}
                    ></div>
                    <p className="truncate text-center text-[11px]">
                        {image.name}
                    </p>
                </div>
            ))}
            {droppedImages.length < 3 && (
                <label
                    htmlFor="fileInput"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform
                    cursor-pointer"
                >
                    {droppedImages.length === 0
                        ? "Drag and drop images here"
                        : ""}
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                    />
                </label>
            )}
        </div>
    );
};

export default DragAndDrop;
