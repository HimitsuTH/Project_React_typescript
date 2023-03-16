import React from "react";
import { Link } from "react-router-dom";

type Props = {
  data: {
    id: string
    name: string,
    description: string
  };
};

const brandItem = ({ data }: Props) => {
   
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
