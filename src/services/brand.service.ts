import axios from "axios";
import authHeader from "./header.service";

export const get_Brand = async () => {
  return await axios
    .get(`${import.meta.env.VITE_URL}/shop/brand`)
    .then((response) => {
      return response.data;
    });
};

export const addBrand = async (name: string, description: string) => {
  return await axios
    .post(
      `${import.meta.env.VITE_URL}/shop/brand`,
      {
        name,
        description,
        shop: import.meta.env.VITE_SHOP_ID,
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response;
    });
};

export const delete_Brand = async (id: string) => {
  return await axios
    .delete(`${import.meta.env.VITE_URL}/shop/brand/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};
