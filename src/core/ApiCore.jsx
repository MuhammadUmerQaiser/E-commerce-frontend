import queryString from "query-string";

export const getProducts = async (sortBy) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=6`,
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

export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const body = {
    limit,
    skip,
    filters,
  };
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products/by/search`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const listSearchProducts = async (params) => {
  const query = queryString.stringify(params);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products/search?${query}`,
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

export const getSingleProduct = async (productId) => {
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

export const getRelatedProduct = async (productId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/products/related/${productId}`,
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

export const getBraintreeClientToken = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/braintree/token/${userId}`,
      {
        method: "GET",
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

export const processPaymentForProduct = async (userId, token, paymentData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/braintree/payment/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
