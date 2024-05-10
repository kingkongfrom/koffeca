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

            <div className="border-lg border-gray-150 inline-block overflow-x-auto rounded-b-lg border">
                <div
                    className="border-gray-150 flex h-12  w-full min-w-[205px] items-center justify-end  rounded-t-lg
                                border-l border-r border-t bg-base-bone px-2.5"
                >
                    <button
                        className="text-md p-2  text-base-feldgrau transition-colors duration-300 hover:text-stone-900"
                        onClick={toggleModal}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <FaPlus size={20} />
                        </span>
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
