import axios from "./AxiosInstance";

export const getCurrentBlkHeight = ({ currentTime }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api?module=block&action=getblocknobytime&timestamp=${currentTime}&closest=before`
      )
      .then((response) => {
        resolve(response?.data);
      })
      .catch((ex) => reject(ex));
  });
};

export const getBalanceOfAddr = ({ addr }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api?module=account&action=balance&address=${addr}&tag=latest`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((ex) => reject(ex));
  });
};
