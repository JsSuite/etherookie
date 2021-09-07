import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.etherscan.io",
});

instance.interceptors.request.use((config) => {
  config.url = config.url + "&apikey=" + "VBIWAP38S65RFXJ4QKQHNZSZD5ZJ94949A";
  return config;
});

export default instance;
