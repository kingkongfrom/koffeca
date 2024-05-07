export const formatPrice = (price) => {
    // Check if the input is not a number
    if (typeof price !== "number") {
        console.error(
            "Input is not a number. Received:",
            price,
            "Type:",
            typeof price,
        );
        return price; // Return the input as is
    }

    // Format the price with the currency symbol "₡" and commas for thousands separator
    const formattedPrice = price.toLocaleString("es-CR", {
        style: "currency",
        currency: "CRC",
    });

    // Remove ",00" if it's present at the end of the string
    return formattedPrice.replace(/,00$/, "");
};
