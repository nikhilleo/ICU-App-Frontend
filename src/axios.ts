import axios from "axios";

const instance: any = axios.create({
  baseURL: "https://lifeline.azurewebsites.net/",
});

export default instance;