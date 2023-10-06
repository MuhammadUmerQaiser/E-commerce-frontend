export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=3`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
