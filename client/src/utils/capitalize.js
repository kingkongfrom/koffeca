export const capitalize = (str) => {
    // Check if the input is not a string or if it's an empty string
    if (typeof str !== "string" || str.trim() === "") {
        console.error(
            "Input is not a valid string. Received:",
            str,
            "Type:",
            typeof str,
        );
        return str; // Return the input as is
    }

    // Capitalize the first letter of the string and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
};
