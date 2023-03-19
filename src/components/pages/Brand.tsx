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
    <div className="right_Item">
      {loading ? (
        <div className="grid gap-3 grid-cols-2">
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
        data.map((data: brand) => <BrandItem key={data.id} data={data} />)
      )}
    </div>
  );
};

export default Brand;
