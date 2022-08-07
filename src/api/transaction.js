import http from "./index";

export const createTransaction = async (params) => {
  const response = await http.post("/transactions", params);
  return response.data;
};
