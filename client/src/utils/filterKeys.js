export const filterKeys = (data, excludedKeys) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    return Object.keys(data[0]).filter((key) => !excludedKeys.includes(key));
};
