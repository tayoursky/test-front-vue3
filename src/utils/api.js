import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SOME_API_ENDPOINT,
  withCredentials: false,
  timeout: 0,
  responseType: "json",
  responseEncoding: "utf8",

  // Reject only if the status code is greater than or equal to specify here
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
});

export { api };
