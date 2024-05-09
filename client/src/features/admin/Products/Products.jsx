import { useState } from "react";
import ProductTable from "./ProductTable.jsx";
import CreateProduct from "./CreateProduct.jsx";
import { useLoaderData, useNavigation } from "react-router-dom";
import Modal from "../../../ui/Modal.jsx";
import { FaPlus } from "react-icons/fa";

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { coffee } = useLoaderData() || { coffee: [] };
    const navigation = useNavigation();

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    return (
        <div className="font-[lato]">
            {navigation.state === "loading"}

            <div className="mb-2 px-3 pt-3">
                <h1 className="text-xl">Product overview</h1>
            </div>

            <div className="border-lg border-gray-150 inline-block overflow-x-auto rounded-b-lg border">
                <div
                    className="border-gray-150 flex h-12 w-full min-w-[205px] items-center justify-end rounded-t-lg
                                    border-l border-r border-t bg-base-bone px-2.5"
                >
                    <button
                        className="rounded-full text-base-darb-dark-brown transition-colors duration-300 hover:text-base-khaki"
                        onClick={toggleModal}
                    >
                        <FaPlus size={20} />
                    </button>
                </div>
                <div>
                    <ProductTable data={coffee} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="bg-white">
                    <CreateProduct onClose={toggleModal} />
                </div>
            </Modal>
        </div>
    );
};

export default Products;
