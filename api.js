import fetch from "node-fetch";
// API call for CRUD operations
export default async function apiCall({api, path, body, method }) {
    return fetch(`${api}/${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        return "Something went Wrong Try again";
      });
  }