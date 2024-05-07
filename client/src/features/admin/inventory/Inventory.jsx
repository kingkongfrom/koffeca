import { useLoaderData, useNavigation } from "react-router-dom";
import InventoryTable from "./InventoryTable.jsx";
import Spinner from "../../../ui/Spinner.jsx";
import { useEffect, useRef, useState } from "react";

const Inventory = () => {
    const { coffee } = useLoaderData() || { coffee: [] };
    const navigation = useNavigation();
    const [width, setWidth] = useState(0);

    const inventoryDivRef = useRef(null);

    useEffect(() => {
        if (inventoryDivRef.current) {
            setWidth(inventoryDivRef.current.offsetWidth);
        }
    }, [inventoryDivRef]);

    return (
        <div className="font-[lato]">
            <div className="mb-2 px-3 pt-3">
                <h1 className="text-xl">Inventory overview</h1>
            </div>

            <div
                className="border-gray-150 bg-base-bone flex h-12 w-full min-w-[205px] items-center justify-end
                rounded-t-lg border-l border-r border-t px-2.5"
                style={{ width: `${width}px` }}
            ></div>
            <div
                ref={inventoryDivRef}
                className="border-lg border-gray-150 inline-block rounded-b-lg border "
            >
                {navigation.state === "loading" ? (
                    <Spinner />
                ) : (
                    <InventoryTable data={coffee} />
                )}
            </div>
        </div>
    );
};
export default Inventory;
