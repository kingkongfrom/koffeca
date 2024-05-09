import { capitalize } from "../../../utils/capitalize.js";
import { formatPrice } from "../../../utils/formatPrice.js";
import { filterKeys } from "../../../utils/filterKeys.js";
import { createUniqueMap } from "../../../utils/createUniqueMap.js";
import InventoryRow from "./InventoryRow.jsx";

const InventoryTable = ({ data }) => {
    if (!data || data.length === 0 || !Array.isArray(data)) {
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
        "slug",
    ];

    const keys = filterKeys(data, excludedKeys);

    const uniqueProducts = createUniqueMap(
        data,
        (item) => `${item.name}-${item.weight}`,
    );

    // Convert the uniqueProducts map to an array
    const uniqueProductsArray = Array.from(uniqueProducts.values());

    return (
        <div className=" ">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Image</th>
                        {/* Render table headers */}
                        {keys.map((key) => (
                            <th key={key} className="py-2">
                                {capitalize(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Render table rows for unique products */}
                    {uniqueProductsArray.map((item, index) => (
                        <InventoryRow
                            key={index}
                            data={item}
                            keys={keys}
                            formatPrice={formatPrice}
                            className={
                                index % 2 === 0 ? "bg-stone-100" : "bg-white"
                            }
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;
