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


//Headphone
export const get_headphone = async () => {
  return await axios
    .get(`${import.meta.env.VITE_URL}/headphone/`)
    .then((response) => {
      return response.data;
    });
};

export const get_Page = async (page:number) => {
  return await axios
  .get(`${import.meta.env.VITE_URL}/headphone/page${page}?`)
  .then((response) => {
    return response.data;
  });
}

export const id_headphone = async (id: any) => {
  return await axios
    .get(`${import.meta.env.VITE_URL}/headphone/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

export const update_headphone = async (headphone: headphone) => {
  const { name, description, category, price, stock, warranty } = headphone;

  return await axios
    .put(
      `${import.meta.env.VITE_URL}/headphone/${headphone.id}`,
      {
        ...(name && { name }),
        ...(description && { description }),
        ...(category && { category }),
        ...(price && { price }),
        ...(stock && { stock }),
        ...(warranty && {warranty})
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

export const add_headphone = async (headphone: headphone) => {
  return await axios
    .post(
      `${import.meta.env.VITE_URL}/headphone`,
      {
        brand: headphone.brand,
        name: headphone.name,
        description: headphone.description,
        category: headphone.category,
        price: headphone.price,
        stock: headphone.stock,
        warranty: headphone.warranty
      },
      {
        headers: authHeader(),
      }
    )
    .then((response) => {
      return response;
    });
};

export const delete_Headphone = async (id: string) => {
  return await axios
    .delete(`${import.meta.env.VITE_URL}/headphone/${id}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response;
    });
};
