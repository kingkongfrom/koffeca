import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        // Pass the search query to the parent component for handling search functionality
        onSearch(event.target.value);
    };

    return (
        <div className=" flex h-12 items-center justify-center border-l border-stone-300 bg-stone-200 px-6 md:px-16">
            <div
                className="mt-1 flex items-center justify-center rounded-full border border-gray-300 bg-white px-2
            focus-within:ring-2 focus-within:ring-blue-300 md:w-full md:max-w-[500px]"
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full rounded-full px-4 py-1 text-gray-700 focus:outline-none"
                />
                <div className="ml-4">
                    <FaSearch size={15} className="mr-2 text-gray-500" />
                </div>
            </div>
        </div>
    );
};

export default Search;
