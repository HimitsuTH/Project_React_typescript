import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BrandItem from "../items/brandItem";
import { Skeleton } from "@mui/material";
type Props = {};

const Brand = (props: Props) => {
  const [data, setData] = useState<any | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBrand = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/shop/brand`);
    setData(res.data);
    setLoading(false);
  };
  //   console.log(data);

  useEffect(() => {
    getBrand();
  }, []);

  useMemo(() => {
    data;
  }, [data]);

  return (
    <div className="right_Item">
      {loading ? (
        <div>
          <Skeleton
            variant="rectangular"
            height={50}
            width={150}
            className="my-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={150}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={150}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={150}
            className="mb-5"
          />
        </div>
      ) : (
        data.map((data: any) => <BrandItem key={data.id} data={data} />)
      )}
    </div>
  );
};

export default Brand;
