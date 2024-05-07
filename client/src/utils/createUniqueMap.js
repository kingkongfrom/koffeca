export const createUniqueMap = (data, getKey) => {
    if (!Array.isArray(data)) {
        throw new Error("Data must be an array.");
    }

    return data.reduce((acc, item) => {
        const key = getKey(item);
        if (!acc.has(key)) {
            acc.set(key, item);
        }
        return acc;
    }, new Map());
};