import { useLoaderData, useNavigation } from "react-router-dom";
import InventoryTable from "./InventoryTable.jsx";

const Inventory = () => {
    const { coffee } = useLoaderData() || { coffee: [] };
    const navigation = useNavigation();

    return (
        <div className="font-[lato]">
            {navigation.state === "loading"}

            <div className="border-lg border-gray-150 inline-block overflow-x-auto rounded-b-lg border">
                <div
                    className="border-gray-150 flex h-12 w-full min-w-[205px] items-center justify-end rounded-t-lg
                border-l border-r border-t bg-base-bone px-2.5"
                ></div>
                <InventoryTable data={coffee} />
            </div>
        </div>
    );
};

export default Inventory;
