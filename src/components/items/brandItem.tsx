import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { brand } from "@/types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { delete_Brand } from "@/services/brand.service";
import { currentUser } from "@/services/user.service";

interface props {}

const brandItem = ({ data }: any | brand) => {
  const navigate = useNavigate();
  const handleDelete = (id: string) => {
    delete_Brand(id).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };
  return (
    <div
      className={
        currentUser.role == "admin"
          ? "p-3 m-2 bg-slate-50 rounded-lg grid place-items-center brandItem"
          : "p-3 m-2 bg-slate-50 rounded-lg grid place-items-cente "
      }
    >
      <Link
        to={`/brand/${data.id}`}
        className="first-letter:uppercase text-md text-center"
      >
        {data.name}
      </Link>
      {currentUser?.role == "admin" && (
        <DeleteIcon
          onClick={() => handleDelete(data.id)}
          className="text-black cursor-pointer"
          sx={{ "&:hover": { color: "#b9bdff" } }}
        />
      )}
    </div>
  );
};

export default brandItem;
