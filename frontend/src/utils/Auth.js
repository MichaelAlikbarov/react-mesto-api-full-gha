import checkResponse from "./checkResponse";
export const BASE_URL = "http://localhost:5000";

function request(url, options) {
  return fetch(`${BASE_URL}/${url}`, options).then(checkResponse);
}

export const register = (email, password) => {
  return request("signup", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const authorize = (email, password) => {
  return request("signin", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// export const getContent = (token) => {
//   return request("users/me", {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const getContent = () => {
  return request("users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};