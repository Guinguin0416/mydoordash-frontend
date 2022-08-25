export const login = (credentials) => { // export -> 导出，方便其他js import
    // fetch api
    const loginUrl = `/login?username=${credentials.username}&password=${credentials.password}`
    
    return fetch(loginUrl, { // login的返回值是promise
        method: "POST",
        header: {
            "Constant-Type" : "application/json",
        },
        credentials: "include",
    }).then((response) => { // .then 把后端的response给CB function
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to log in") // 如果返回的reponse有问题就抛出异常
        }
    });
};

export const signup = (data) => {
    const signupUrl = "/signup";
  
    return fetch(signupUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};

export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get menus");
        }
        return response.json(); // 转换成json object
    });
};

export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get restaurants");
      }
  
      return response.json();
    });
};

export const getCart = () => {
    return fetch("/cart").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to get shopping cart data");
      }
  
      return response.json();
    });
};
  
export const checkout = () => {
    return fetch("/checkout").then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to checkout");
      }
    });
};
  
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });
};
  
  
  