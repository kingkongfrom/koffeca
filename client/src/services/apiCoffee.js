const API_URL = "http://localhost:3000/api/v1/coffee";

export const getAllCoffee = async () => {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Failed to fetch coffee product");
        }

        const { data } = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching coffee data:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
};
