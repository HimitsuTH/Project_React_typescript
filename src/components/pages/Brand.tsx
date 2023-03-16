import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BrandItem from "../items/brandItem";

type Props = {};

const Brand = (props: Props) => {
  const [data, setData] = useState<any | []>([]);
  const getBrand = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/shop/brand`);
    setData(res.data);
  };
  //   console.log(data);

  useEffect(() => {
    getBrand();
  }, []);

  useMemo(() => {
    data
  }, [data]);

  return (
    <div className="right_Item">
      {data.map((data: any) => (
        <BrandItem key={data.id} data={data} />
      ))}
    </div>
  );
};

export default Brand;
