import { useLayoutEffect, useRef, useState } from "react";
import Spinner from "../../../ui/Spinner.jsx";
import ProductTable from "./ProductTable.jsx";
import CreateProduct from "./CreateProduct.jsx";
import { FaPlus } from "react-icons/fa";
import { useLoaderData, useNavigation } from "react-router-dom";
import Modal from "../../../ui/Modal.jsx";

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { coffee } = useLoaderData() || { coffee: [] };
    const navigation = useNavigation();
    const [width, setWidth] = useState(0);
    const divRef = useRef(null);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    // Use useLayoutEffect to update width on DOM changes
    useLayoutEffect(() => {
        const updateWidth = () => {
            if (divRef.current) {
                setWidth(divRef.current.offsetWidth);
            }
        };

        // Update width initially and on resize
        updateWidth();
        window.addEventListener("resize", updateWidth);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", updateWidth);
    }, [divRef]);

    return (
        <div className="font-[lato]">
            <div className="mb-2 px-3 pt-3">
                <h1 className="text-xl">Product overview</h1>
            </div>

            <div
                className="border-gray-150 flex h-12 w-full min-w-[205px] items-center justify-end rounded-t-lg
                border-l border-r border-t bg-base-bone px-2.5"
                style={{ width: `${width}px` }}
            >
                <button
                    className="rounded-full text-base-darb-dark-brown transition-colors duration-300 hover:text-base-khaki"
                    onClick={toggleModal}
                >
                    <FaPlus size={20} />
                </button>
            </div>

            {/* Render the bone-colored div only when coffee data is available */}
            {coffee.length > 0 && (
                <div
                    ref={divRef}
                    className="border-lg border-gray-150 inline-block overflow-x-auto rounded-b-lg border"
                >
                    {navigation.state === "loading" ? (
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div>
                            <ProductTable data={coffee} />
                        </div>
                    )}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="bg-white">
                    <CreateProduct onClose={toggleModal} />
                </div>
            </Modal>
        </div>
    );
};

export default Products;
