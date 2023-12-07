const getAllProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching products');
    }
};

export const productsApi = {
    getAllProducts,
}
