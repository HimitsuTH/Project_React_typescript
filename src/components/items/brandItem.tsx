import React from "react";
import { Link } from "react-router-dom";
import { brand } from "@/types/types";
interface props {}

const brandItem = ({ data }: any | brand) => {
  return (
    <Link
      to={`/shop/brand/${data.id}`}
      className="p-2 m-2 text-center bg-slate-50 rounded-lg uppercase"
    >
      {data.name}
    </Link>
  );
};

export default brandItem;
