import axios from "axios";
import authHeader from "./header.service";
import { headphone } from "@/types/types";

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

export const add_headphone = async (headphone: headphone) => {
  return await axios
    .post(
      `${import.meta.env.VITE_URL}/headphone`,
      {
        brand: headphone.brand,
        name:headphone.name,
        description: headphone.description,
        category: headphone.category,
        price: headphone.price,
        stock: headphone.stock
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response;
    });
};
