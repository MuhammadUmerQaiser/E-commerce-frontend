export const createCategory = async (userId, token, name) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/category/create/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name}),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
