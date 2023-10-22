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
        body: JSON.stringify({ name }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/create/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (userId, token, product) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/categories`,
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

export const getAllOrdersListForAdmin = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/list/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByIdForAdmin = async (orderId, userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/order/${orderId}/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatusValuesForOrders = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/order/status-values/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (userId, token, orderId, status) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/order/${orderId}/update-status/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, orderId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsList = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products?limit=undefined`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProductById = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}`,
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

export const updateProductDetail = async (
  productId,
  userId,
  token,
  product
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/product/${productId}/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
