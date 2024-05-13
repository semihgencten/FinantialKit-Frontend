import axios from "axios";
import Cookies from "universal-cookie";

let cookies = new Cookies(null, { path: "/" });

const handler = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
export default function (config) {
  if (!config.headers) config.headers = {};

  let auth_token = cookies.get("token");
  config.headers.Authorization = ` Token ${auth_token}`;
  console.log(config);
  let result = handler(config);
  console.log(result);
  return result;
}
