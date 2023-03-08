import { addCookie, getCookie } from "./components/";

const baseUrl = "https://ajax.test-danit.com/api/v2";
const method = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const loginUser = async (object) => {
  const response = await fetch(baseUrl + "/cards/login", {
    method: method.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.text();
};
