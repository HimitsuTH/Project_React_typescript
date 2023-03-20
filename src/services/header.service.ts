export let tokenStr = localStorage.getItem("token");

export default function authHeader() {
  // const tokenStr = localStorage.getItem("token");
  let token = null;
  if (tokenStr) token = JSON.parse(tokenStr);

  if (token && token.access_token) {
    return { Authorization: "Bearer " + token.access_token };
  } else {
    return { Authorization: "" };
  }
}
