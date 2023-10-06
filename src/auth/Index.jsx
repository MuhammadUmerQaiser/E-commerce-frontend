export const signUpUser = async (user) => {
  //user gets and object of name, email and password
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (user) => {
  //user gets and object of name, email and password
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const authenticateUser = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
    }else{
        return false;
    }
}
