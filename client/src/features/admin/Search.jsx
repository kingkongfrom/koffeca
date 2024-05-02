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
        <div className="flex justify-center px-6 md:px-16">
            <div className="mt-3 flex w-full items-center justify-center rounded-full border border-gray-300 bg-white md:max-w-[500px]">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch size={20} className="ml-2 mr-6 text-gray-500" />
            </div>
        </div>
    );
};

export default Search;
