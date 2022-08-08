import Axios from "axios";
import { CONFIG } from "./config";

export default function axiosCall(method, url, data) {
  let URL = CONFIG.BASE_URL + url;
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    return Axios.post(URL, data, config);
  } else if (method === "GET") {
    return Axios.get(URL, config);
  } else if (method === "PUT") {
    return Axios.put(URL, data, config);
  }
}
