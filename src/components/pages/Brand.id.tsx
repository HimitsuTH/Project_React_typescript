import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

type Props = {};

type brand = {
  brand:{
    id:string,
    name:string,
  },
  headphone: {
    id:string,
    name: string
  }
};

const Brand_id = (props: Props) => {
  const { id } = useParams();
  const [data, setData] = useState<brand | any>();
  const [loading , setLoading ] = useState<boolean>(true);
    const getBrand = async () => {
        const res = await axios.get(`${import.meta.env.VITE_URL}/shop/brand/${id}`)
        setData(res.data);
        setLoading(false)
        console.log(res)
    }
    useEffect(()=> {
        getBrand();
    },[])

  return (
    <div className="grid h-screen place-items-center">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="grid h-screen place-items-center">
          <div className="uppercase bg-slate-50 p-3 rounded-lg select-none">{data.brand.name}</div>
          <Link to={"/"} className="bg-slate-100 p-2 rounded-md mt-5">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default Brand_id;
