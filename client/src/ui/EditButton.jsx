import { FaPencil } from "react-icons/fa6";
import React from "react";

const EditButton = () => {
    return (
        <button
            className="text-base-khaki mr-2 cursor-pointer rounded-full transition
                 duration-300 "
        >
            <FaPencil size={20} />
        </button>
    );
};
export default EditButton;
