export const getUserData = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
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

export const updateUserProfile = async (userId, token, user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDataInLocalStorage = (user, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth.user = user;
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};

export const getUserPurchaseHistoryDetails = async (userId, token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/orders/by/user/${userId}`,
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
