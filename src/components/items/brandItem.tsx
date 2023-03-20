import React from "react";
import { Link } from "react-router-dom";
import { brand } from "@/types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { delete_Brand } from "@/services/brand.service";

interface props {}

const brandItem = ({ data }: any | brand) => {
  const handleDelete = (id: string) => {
    delete_Brand(id).then((res) => {
      console.log(res);
      window.location.reload()
    });
  };

  return (
    <div className="p-2 m-2 bg-slate-50 rounded-lg grid place-items-center brandItem">
      <Link
        to={`/shop/brand/${data.id}`}
        className=" uppercase text-xs text-center"
      >
        {data.name}
      </Link>
      <DeleteIcon
        onClick={() => handleDelete(data.id)}
        className="text-black cursor-pointer"
        sx={{ "&:hover": { color: "#b9bdff" } }}
      />
    </div>
  );
};

export default brandItem;
