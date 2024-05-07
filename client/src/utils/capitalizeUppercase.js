export const capitalizeUppercase = (str) => {
    // Convert the input to a string
    const inputStr = String(str);

    // Check if the input is not a string
    if (typeof inputStr !== "string") {
        console.error(
            "Input is not a string. Received:",
            inputStr,
            "Type:",
            typeof inputStr,
        );
        return inputStr; // Return the input as is
    }

    // Check if the input string is empty
    if (!inputStr) return "";

    // Capitalize the first letter of each word in the input string
    return inputStr
        .toLowerCase()
        .replace(/\b\w/g, (match) => match.toUpperCase());
};
