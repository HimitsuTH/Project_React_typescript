import axios from "axios";

export const get_Brand = async () => {
    return axios.get(`${import.meta.env.VITE_URL}/shop/brand`).then((response)=> {return response.data})
};
