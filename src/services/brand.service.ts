import axios from "axios";
import authHeader from "./header.service";

export const get_Brand = async () => {
    return axios.get(`${import.meta.env.VITE_URL}/shop/brand`).then((response)=> {return response.data})
};

export const delete_Brand = async (id:string) => {
    return axios
      .delete(`${import.meta.env.VITE_URL}/shop/brand/${id}`, {headers: authHeader()})
      .then((response) => {
        return response.data;
      });
}
