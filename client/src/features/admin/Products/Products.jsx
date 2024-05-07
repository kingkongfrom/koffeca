import { useLoaderData, useNavigation } from "react-router-dom";
import ProductTable from "./ProductTable.jsx";
import Spinner from "../../../ui/Spinner.jsx";
import { Fragment, useEffect, useRef, useState } from "react";
import Modal from "../../../ui/Modal.jsx";
import CreateProduct from "./CreateProduct.jsx";
import { FaPlus } from "react-icons/fa";

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { coffee } = useLoaderData() || { coffee: [] };
    const navigation = useNavigation();
    const [width, setWidth] = useState(0);
    const divRef = useRef(null);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };

    useEffect(() => {
        if (divRef.current) {
            setWidth(divRef.current.offsetWidth);
        }
    }, [divRef]);

    return (
        <div className="font-[lato]">
            <div className="mb-2 px-3 pt-3">
                <h1 className="text-xl">Product overview</h1>
            </div>

            <div
                className="border-gray-150 bg-base-bone flex h-12 min-w-[205px] items-center justify-end
                rounded-t-lg border-l border-r border-t px-2.5"
                style={{ width: `${width}px` }}
            >
                <button
                    className="text-base-darb-dark-brown hover:text-base-khaki rounded-full transition-colors duration-300"
                    onClick={toggleModal}
                >
                    <FaPlus size={20} />
                </button>
            </div>

            <div
                ref={divRef}
                className="border-lg border-gray-150 inline-block rounded-b-lg border"
            >
                {navigation.state === "loading" ? (
                    <div className="flex  items-center justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <Fragment>
                        <ProductTable data={coffee} />
                    </Fragment>
                )}
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
