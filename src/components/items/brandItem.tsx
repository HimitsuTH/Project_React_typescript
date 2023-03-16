import React from "react";
import { Link } from "react-router-dom";

type Props = {
  data: {
    name: string,
    description: string
  };
};

const brandItem = ({ data }: Props) => {
   
  return (
    <Link to={""} className="p-2 m-2 text-center bg-slate-50 rounded-lg">
      {data.name}
    </Link>
  );
};

export default brandItem;
