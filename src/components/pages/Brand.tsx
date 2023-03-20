import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import BrandItem from "../items/brandItem";
import { Skeleton } from "@mui/material";
import { get_Brand } from "@/services/brand.service";
import { brand } from "@/types/types";
type Props = {};

const Brand = (props: Props) => {
  const [data, setData] = useState<brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBrand = async () => {
    // const res = await axios.get(`${import.meta.env.VITE_URL}/shop/brand`);
    get_Brand().then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    getBrand();
  }, []);

  useMemo(() => {
    data;
  }, [data]);

  return (
    <div className="grid h-screen place-items-center">
      {loading ? (
        <div className="grid gap-2 grid-cols-2">
          <Skeleton
            variant="rectangular"
            height={50}
            width={120}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={120}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={120}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={120}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={120}
            className="mb-5"
          />
          <Skeleton
            variant="rectangular"
            height={50}
            width={120}
            className="mb-5"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {data.map((data: brand) => (
            <BrandItem key={data.id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Brand;
