import React, { useState, useEffect, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import BrandItem from "../../items/brandItem";

import { Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { get_Brand } from "@/services/brand.service";
import { brand } from "@/types/types";
import IUser from "@/types/Auth";

type Props = {};

const Brand = (props: Props) => {
  const [data, setData] = useState<brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = localStorage.getItem("user");
  const currentUser: IUser = user ? JSON.parse(user) : {};
  const navigate = useNavigate();

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
      {currentUser.role == "admin" && (
        <AddIcon
          className="text-white mx-3 cursor-pointer absolute top-32 rounded-full bg-slate-800"
          sx={{
            fontSize: 36,
            "&:hover": { color: "#b9bdff", background: "#0b006d75" },
          }}
          onClick={() => navigate("/brand/add")}
        />
      )}

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
          {data.map((data: brand ) => (
            <BrandItem key={data.id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Brand;
