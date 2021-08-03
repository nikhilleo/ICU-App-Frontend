import axios from "axios";

const instance: any = axios.create({
  baseURL: "https://icu-app-cloudnxt.herokuapp.com/",
  // baseURL: "http://localhost:8080",
});

export default instance;