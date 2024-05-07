import ProductRow from "./ProductRow.jsx";
import { formatPrice } from "../../../utils/formatPrice.js";
import { capitalize } from "../../../utils/capitalize.js";
import { filterKeys } from "../../../utils/filterKeys.js";
import { createUniqueMap } from "../../../utils/createUniqueMap.js"; // Adjust the path as needed

const ProductTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="min-w-[205px]">No data available</div>;
    }

    const excludedKeys = [
        "_id",
        "description",
        "taste",
        "region",
        "sku",
        "images",
        "available",
    ];
    const keys = filterKeys(data, excludedKeys);

    // Filter out repeated products based on name and weight
    const uniqueProducts = createUniqueMap(
        data,
        (item) => `${item.name}-${item.weight}`,
    );

    // Convert the uniqueProducts map to an array
    const uniqueProductsArray = Array.from(uniqueProducts.values());

    return (
        <div className="">
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        {/* Render table headers */}
                        {keys.map((key) => (
                            <th key={key} className="">
                                {capitalize(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render table rows for unique products */}
                    {uniqueProductsArray.map((item, index) => (
                        <ProductRow
                            key={index}
                            data={item}
                            keys={keys}
                            className={
                                index % 2 === 0 ? "bg-stone-100" : "bg-white"
                            }
                            formatPrice={formatPrice} // Pass the formatPrice function as a prop
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
